'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useRouter } from 'next/navigation';
import { Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { useI18n } from '@/lib/hooks/use-i18n';
import { SectionHeading } from '@/components/marketing/section-heading';
import { CTAButton } from '@/components/marketing/cta-button';
import { useImportClassroom, type ImportPhase } from '@/lib/import/use-import-classroom';
import { BUILTIN_CLASSROOMS } from '@/lib/utils/builtin-classrooms';
import { stageExists } from '@/lib/utils/stage-storage';

export default function CasesPage() {
  const { t } = useI18n();
  const router = useRouter();

  const [importingBuiltin, setImportingBuiltin] = useState(false);
  const [importingName, setImportingName] = useState('');
  const [importPhase, setImportPhase] = useState<ImportPhase>('idle');

  const { importClassroomFromUrl } = useImportClassroom();

  const cases = BUILTIN_CLASSROOMS.map((item, idx) => ({
    id: item.id,
    title: t(`casesPage.list.case${idx + 1}.title`) || item.name,
    desc: t(`casesPage.list.case${idx + 1}.desc`) || item.description,
    tag: t(`casesPage.list.case${idx + 1}.tag`) || item.tag,
    color: item.color,
    zipPath: item.zipPath,
  }));

  const handleCaseClick = async (id: string, zipPath: string, name: string) => {
    try {
      const downloaded = await stageExists(id);
      if (!downloaded) {
        setImportingName(name);
        setImportingBuiltin(true);
        setImportPhase('downloading');

        await importClassroomFromUrl(zipPath, id, (phase) => {
          setImportPhase(phase);
        });
      }
      router.push(`/classroom/${id}`);
    } catch (err) {
      console.error('Failed to import builtin classroom from cases page:', err);
      toast.error(t('import.error.invalidZip') || '导入失败，请检查网络或文件。');
      setImportingBuiltin(false);
    }
  };

  return (
    <div className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <SectionHeading
        tag={t('marketing.nav.cases')}
        title={t('casesPage.subtitle')}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cases.map((cs, idx) => (
          <motion.div
            key={cs.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 100, damping: 20, delay: idx * 0.1 }}
            className="group flex flex-col justify-between overflow-hidden rounded-3xl glass-card glass-card-hover glow-border-hover transition-all duration-300 shadow-sm"
          >
            {/* Visual Header */}
            <div className={`h-40 bg-gradient-to-br ${cs.color} p-6 flex flex-col justify-between text-white relative`}>
              <div className="absolute inset-0 bg-black/5 dark:bg-black/10 mix-blend-overlay" />
              <span className="text-xs font-bold bg-white/10 dark:bg-black/20 backdrop-blur-md px-3 py-1 rounded-full w-max border border-white/10 relative z-10">
                {cs.tag}
              </span>
              <h4 className="text-xl font-bold line-clamp-2 relative z-10 tracking-tight">{cs.title}</h4>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
              <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                {cs.desc}
              </p>
              <div className="pt-4">
                <button
                  onClick={() => handleCaseClick(cs.id, cs.zipPath, cs.title)}
                  className="w-full text-xs py-2 px-6 rounded-full font-semibold transition-all duration-300 shadow-md cursor-pointer bg-white/70 dark:bg-zinc-900/70 border border-zinc-200/80 dark:border-zinc-800/80 backdrop-blur-md hover:bg-white dark:hover:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 text-zinc-950 dark:text-white"
                >
                  {t('casesPage.generateCta')}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Builtin Classroom Import Overlay */}
      <AnimatePresence>
        {importingBuiltin && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/65 backdrop-blur-md"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              className="w-full max-w-sm p-6 rounded-3xl border bg-card text-card-foreground shadow-2xl space-y-6 mx-4 relative overflow-hidden"
            >
              <div className="space-y-2 text-center">
                <div className="inline-flex items-center justify-center size-12 rounded-2xl bg-primary/10 text-primary mb-1">
                  <Sparkles className="size-6 animate-pulse" />
                </div>
                <h3 className="text-[15px] font-bold tracking-tight">正在准备课堂案例</h3>
                <p className="text-[12px] text-muted-foreground font-medium truncate max-w-full px-2">
                  {importingName}
                </p>
              </div>

              <div className="space-y-2.5">
                <div className="flex justify-between text-[11px] text-muted-foreground font-semibold">
                  <span>
                    {importPhase === 'downloading' && '正在下载课程资源包...'}
                    {importPhase === 'parsing' && '正在解析资源...'}
                    {importPhase === 'validating' && '正在验证文件...'}
                    {importPhase === 'writingMedia' && '正在加载媒体与音频...'}
                    {importPhase === 'writingCourse' && '正在构建课程大纲...'}
                    {importPhase === 'done' && '准备就绪！'}
                  </span>
                  <span className="font-bold text-primary">
                    {importPhase === 'downloading' && '20%'}
                    {importPhase === 'parsing' && '40%'}
                    {importPhase === 'validating' && '60%'}
                    {importPhase === 'writingMedia' && '80%'}
                    {importPhase === 'writingCourse' && '95%'}
                    {importPhase === 'done' && '100%'}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary"
                    initial={{ width: '0%' }}
                    animate={{
                      width:
                        importPhase === 'downloading' ? '20%' :
                        importPhase === 'parsing' ? '40%' :
                        importPhase === 'validating' ? '60%' :
                        importPhase === 'writingMedia' ? '80%' :
                        importPhase === 'writingCourse' ? '95%' :
                        importPhase === 'done' ? '100%' : '0%'
                    }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                  />
                </div>
              </div>

              <p className="text-[10px] text-center text-muted-foreground/50">
                首次加载需要下载媒体素材，后续打开将无需等待
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
