'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, BookOpen, HelpCircle, Lightbulb, Info, AlertTriangle, ChevronRight } from 'lucide-react';
import { useI18n } from '@/lib/hooks/use-i18n';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ManualSheetProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'userManual' | 'aiConfig';
}

interface Chapter {
  title: string;
  index: number;
}

interface ManualConfig {
  id: 'userManual' | 'aiConfig';
  titleKey: string;
  getPath: (locale: string) => string;
  imagePrefix: string;
}

const MANUAL_CONFIGS: ManualConfig[] = [
  {
    id: 'userManual',
    titleKey: 'home.manualTabs.userManual',
    getPath: (locale: string) => (locale.startsWith('zh') ? '/user-manual-zh.md' : '/user-manual-en.md'),
    imagePrefix: '',
  },
  {
    id: 'aiConfig',
    titleKey: 'home.manualTabs.aiConfig',
    getPath: () => '/manuals/ai-configure/AI服务配置详细说明.md',
    imagePrefix: '/manuals/ai-configure/',
  },
];

export function ManualSheet({ isOpen, onClose, defaultTab }: ManualSheetProps) {
  const { locale, t } = useI18n();
  const [activeTab, setActiveTab] = useState<'userManual' | 'aiConfig'>('userManual');
  const [markdown, setMarkdown] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [activeChapter, setActiveChapter] = useState<number>(0);
  
  const contentRef = useRef<HTMLDivElement>(null);

  // Synchronize activeTab with defaultTab when drawer is opened
  useEffect(() => {
    if (isOpen && defaultTab) {
      setActiveTab(defaultTab);
    }
  }, [isOpen, defaultTab]);

  // Load manual based on locale and active tab
  useEffect(() => {
    if (!isOpen) return;

    // Prevent fetching if defaultTab is provided but activeTab hasn't updated yet
    if (defaultTab && activeTab !== defaultTab) {
      return;
    }

    const fetchManual = async () => {
      setLoading(true);
      const config = MANUAL_CONFIGS.find((c) => c.id === activeTab) || MANUAL_CONFIGS[0];
      const primaryPath = config.getPath(locale);
      const fallbackPath = '/user-manual-zh.md';

      try {
        let res = await fetch(primaryPath);
        if (!res.ok && config.id === 'userManual') {
          // Fallback to Chinese if English or other languages fail
          res = await fetch(fallbackPath);
        }
        const text = await res.text();
        setMarkdown(text);
        
        // Parse chapters
        const parsedChapters: Chapter[] = [];
        let h2Count = 0;
        text.split('\n').forEach((line) => {
          const trimmed = line.trim();
          if (trimmed.startsWith('## ')) {
            const title = trimmed.replace(/^##\s*/, '').replace(/\*\*/g, '').trim();
            if (title) {
              parsedChapters.push({ title, index: h2Count });
              h2Count++;
            }
          }
        });
        setChapters(parsedChapters);
        setActiveChapter(0);
      } catch (err) {
        console.error('Failed to load user manual:', err);
        setMarkdown('# Error\nFailed to load user manual. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchManual();
  }, [isOpen, locale, activeTab, defaultTab]);

  // Handle click on directory items to smooth scroll right container
  const handleChapterClick = (index: number) => {
    setActiveChapter(index);
    const container = contentRef.current;
    const target = document.getElementById(`manual-sec-${index}`);
    if (container && target) {
      const containerTop = container.getBoundingClientRect().top;
      const targetTop = target.getBoundingClientRect().top;
      const relativeTop = targetTop - containerTop + container.scrollTop - 24; // 24px padding offset
      container.scrollTo({
        top: relativeTop,
        behavior: 'smooth',
      });
    }
  };

  // Helper function to render inline markdown styles
  const parseInlineStyles = (text: string) => {
    // Bold **text**
    let parsed = text.replace(
      /\*\*(.*?)\*\*/g, 
      '<strong class="font-semibold text-slate-900 dark:text-white">$1</strong>'
    );
    // Inline code `code`
    parsed = parsed.replace(
      /`(.*?)`/g,
      '<code class="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-purple-600 dark:text-purple-400 font-mono text-[11px] font-semibold rounded">$1</code>'
    );
    return parsed;
  };

  // Custom renderer for parsed manual contents
  const renderMarkdown = (text: string) => {
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];
    
    let currentBlockquote: { type: string; lines: string[] } | null = null;
    let currentList: string[] | null = null;
    let currentCode: { lang: string; lines: string[] } | null = null;
    let h2Index = 0;
    let currentTable: { headers: string[]; alignments: string[]; rows: string[][] } | null = null;

    const flushBlockquote = (key: string) => {
      if (!currentBlockquote) return null;
      const { type, lines } = currentBlockquote;
      currentBlockquote = null;
      
      const contentText = lines.join(' ');
      const parsedText = parseInlineStyles(contentText);

      let icon = <Info className="w-4 h-4 shrink-0 text-blue-500 mt-0.5" />;
      let title = '提示';
      let cardClass = 'bg-blue-50/50 border-blue-200 dark:bg-blue-950/20 dark:border-blue-900/50 text-blue-800 dark:text-blue-200';

      if (type === 'TIP') {
        icon = <Lightbulb className="w-4 h-4 shrink-0 text-amber-500 mt-0.5" />;
        title = '技巧';
        cardClass = 'bg-amber-50/50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-900/50 text-amber-800 dark:text-amber-200';
      } else if (type === 'IMPORTANT' || type === 'WARNING') {
        icon = <AlertTriangle className="w-4 h-4 shrink-0 text-rose-500 mt-0.5" />;
        title = '重要';
        cardClass = 'bg-rose-50/50 border-rose-200 dark:bg-rose-950/20 dark:border-rose-900/50 text-rose-800 dark:text-rose-200';
      }

      return (
        <div key={key} className={cn('p-4 border rounded-xl my-4 flex gap-3 text-xs leading-relaxed shadow-xs', cardClass)}>
          {icon}
          <div>
            <span className="font-bold mr-1">{title}:</span>
            <span dangerouslySetInnerHTML={{ __html: parsedText }} />
          </div>
        </div>
      );
    };

    const flushList = (key: string) => {
      if (!currentList) return null;
      const items = currentList;
      currentList = null;
      return (
        <ul key={key} className="list-disc pl-5 my-3 text-xs text-slate-600 dark:text-slate-300 space-y-1.5">
          {items.map((item, index) => (
            <li key={index} dangerouslySetInnerHTML={{ __html: parseInlineStyles(item) }} />
          ))}
        </ul>
      );
    };

    const flushCode = (key: string) => {
      if (!currentCode) return null;
      const { lines } = currentCode;
      currentCode = null;
      return (
        <pre key={key} className="p-3 bg-slate-950 text-slate-100 rounded-lg my-3 font-mono text-[11px] overflow-x-auto leading-normal border border-slate-800">
          <code>{lines.join('\n')}</code>
        </pre>
      );
    };
    const flushTable = (key: string) => {
      if (!currentTable) return null;
      const { headers, alignments, rows } = currentTable;
      currentTable = null;

      return (
        <div key={key} className="my-4 overflow-x-auto rounded-lg border border-slate-100 dark:border-slate-800 shadow-xs">
          <table className="w-full text-left border-collapse text-[11px]">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/40 border-b border-slate-100 dark:border-slate-800">
                {headers.map((header, idx) => {
                  const align = alignments[idx] || 'left';
                  return (
                    <th 
                      key={idx} 
                      className="px-3 py-2 font-bold text-slate-700 dark:text-slate-300"
                      style={{ textAlign: align as any }}
                      dangerouslySetInnerHTML={{ __html: parseInlineStyles(header) }}
                    />
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-850">
              {rows.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/10 transition-colors">
                  {row.map((cell, cIdx) => {
                    const align = alignments[cIdx] || 'left';
                    return (
                      <td 
                        key={cIdx} 
                        className="px-3 py-2 text-slate-600 dark:text-slate-400 leading-relaxed"
                        style={{ textAlign: align as any }}
                        dangerouslySetInnerHTML={{ __html: parseInlineStyles(cell) }}
                      />
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    };
    for (let i = 0; i < lines.length; i++) {
      const rawLine = lines[i];
      const line = rawLine.trim();

      const isTableRow = line.startsWith('|') && line.endsWith('|') && line.length > 1;

      if (!isTableRow && currentTable) {
        elements.push(flushTable(`table-${elements.length}`));
      }

      if (isTableRow) {
        const cells = line.split('|').slice(1, -1).map(c => c.trim());
        if (!currentTable) {
          const nextLine = lines[i + 1]?.trim() || '';
          const isNextDivider = nextLine.startsWith('|') && nextLine.endsWith('|') && nextLine.replace(/[|:\s-]/g, '') === '';
          if (isNextDivider) {
            if (currentList) elements.push(flushList(`list-${elements.length}`));
            if (currentBlockquote) elements.push(flushBlockquote(`bq-${elements.length}`));
            currentTable = {
              headers: cells,
              alignments: [],
              rows: []
            };
            continue;
          }
        } else {
          const isDivider = line.replace(/[|:\s-]/g, '') === '';
          if (isDivider) {
            currentTable.alignments = cells.map(cell => {
              if (cell.startsWith(':') && cell.endsWith(':')) return 'center';
              if (cell.endsWith(':')) return 'right';
              return 'left';
            });
            continue;
          } else {
            currentTable.rows.push(cells);
            continue;
          }
        }
      }

      // Handle Images
      const imgMatch = line.match(/^!\[(.*?)\]\((.*?)\)$/);
      if (imgMatch) {
        if (currentList) elements.push(flushList(`list-${elements.length}`));
        if (currentBlockquote) elements.push(flushBlockquote(`bq-${elements.length}`));
        const alt = imgMatch[1];
        const src = imgMatch[2];
        const currentConfig = MANUAL_CONFIGS.find((c) => c.id === activeTab) || MANUAL_CONFIGS[0];
        let finalSrc = src;
        if (currentConfig.imagePrefix && !src.startsWith('http') && !src.startsWith('/')) {
          finalSrc = `${currentConfig.imagePrefix}${src}`;
        }
        elements.push(
          <div key={`img-${i}`} className="my-4 overflow-hidden rounded-xl border border-slate-100 dark:border-slate-800 shadow-xs bg-slate-50/20">
            <img src={finalSrc} alt={alt} className="w-full object-cover" />
            {alt && (
              <div className="bg-slate-50 dark:bg-slate-900/50 px-3 py-1.5 text-[10px] text-slate-400 dark:text-slate-500 border-t border-slate-100 dark:border-slate-800 text-center font-medium">
                {alt}
              </div>
            )}
          </div>
        );
        continue;
      }

      // Handle Code Blocks
      if (line.startsWith('```')) {
        if (currentCode) {
          elements.push(flushCode(`code-${elements.length}`));
        } else {
          if (currentList) elements.push(flushList(`list-${elements.length}`));
          if (currentBlockquote) elements.push(flushBlockquote(`bq-${elements.length}`));
          currentCode = {
            lang: line.substring(3).trim(),
            lines: []
          };
        }
        continue;
      }

      if (currentCode) {
        currentCode.lines.push(rawLine);
        continue;
      }

      // Handle Blockquotes (Note/Tip/Important)
      if (line.startsWith('>')) {
        if (currentList) elements.push(flushList(`list-${elements.length}`));
        const quoteText = line.substring(1).trim();
        if (
          quoteText.startsWith('[!NOTE]') || 
          quoteText.startsWith('[!TIP]') || 
          quoteText.startsWith('[!IMPORTANT]') || 
          quoteText.startsWith('[!WARNING]')
        ) {
          if (currentBlockquote) elements.push(flushBlockquote(`bq-${elements.length}`));
          const type = quoteText.includes('TIP') 
            ? 'TIP' 
            : (quoteText.includes('IMPORTANT') || quoteText.includes('WARNING') ? 'IMPORTANT' : 'NOTE');
          currentBlockquote = { type, lines: [] };
        } else {
          if (currentBlockquote) {
            currentBlockquote.lines.push(quoteText);
          } else {
            currentBlockquote = { type: 'NOTE', lines: [quoteText] };
          }
        }
        continue;
      } else if (currentBlockquote) {
        elements.push(flushBlockquote(`bq-${elements.length}`));
      }

      // Handle Unordered Lists
      if (line.startsWith('- ') || line.startsWith('* ')) {
        const itemText = line.substring(2);
        if (!currentList) {
          currentList = [];
        }
        currentList.push(itemText);
        continue;
      } else if (currentList) {
        elements.push(flushList(`list-${elements.length}`));
      }

      if (line === '') continue;
      
      // Handle Horizontal Rules
      if (line === '---') {
        elements.push(<hr key={`hr-${i}`} className="my-5 border-slate-100 dark:border-slate-800" />);
        continue;
      }

      // Handle Headings
      if (line.startsWith('#')) {
        const level = line.match(/^#+/)?.[0].length || 1;
        const titleText = line.replace(/^#+\s*/, '');
        const parsedTitle = parseInlineStyles(titleText);

        if (level === 2) {
          const currentIndex = h2Index;
          h2Index++;
          elements.push(
            <h2 
              key={`h2-${i}`} 
              id={`manual-sec-${currentIndex}`} 
              className="text-sm font-bold text-slate-800 dark:text-slate-100 mt-6 mb-3 border-b pb-2 border-slate-100 dark:border-slate-800/80 flex items-center gap-2 scroll-mt-6"
            >
              <span className="w-1 h-3.5 rounded bg-purple-500 inline-block shrink-0" />
              <span dangerouslySetInnerHTML={{ __html: parsedTitle }} />
            </h2>
          );
        } else if (level === 3) {
          elements.push(
            <h3 key={`h3-${i}`} className="text-xs font-semibold text-slate-700 dark:text-slate-200 mt-4 mb-2">
              <span dangerouslySetInnerHTML={{ __html: parsedTitle }} />
            </h3>
          );
        } else if (level === 1) {
          elements.push(
            <h1 key={`h1-${i}`} className="text-base font-extrabold text-slate-900 dark:text-slate-50 mt-1 mb-4 flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent dark:from-purple-400 dark:to-indigo-400">
              <BookOpen className="w-4 h-4 text-purple-600 dark:text-purple-400 inline" />
              <span dangerouslySetInnerHTML={{ __html: parsedTitle }} />
            </h1>
          );
        }
        continue;
      }

      // Normal paragraph
      elements.push(
        <p 
          key={`p-${i}`} 
          className="text-xs leading-relaxed text-slate-600 dark:text-slate-300 my-2.5" 
          dangerouslySetInnerHTML={{ __html: parseInlineStyles(line) }} 
        />
      );
    }

    // Clean up remaining blocks
    if (currentList) elements.push(flushList(`list-end`));
    if (currentBlockquote) elements.push(flushBlockquote(`bq-end`));
    if (currentCode) elements.push(flushCode(`code-end`));
    if (currentTable) elements.push(flushTable(`table-end`));

    return elements;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay mask */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/25 dark:bg-black/55 backdrop-blur-xs"
          />

          {/* Right Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            className="fixed right-0 top-0 bottom-0 z-50 flex h-full w-full flex-col bg-white shadow-2xl dark:bg-slate-900 border-l border-slate-200/50 dark:border-slate-800/80 md:w-[620px] lg:w-[760px] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 px-4 py-3 shrink-0">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {t('home.helpManual')}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-slate-100 dark:border-slate-800 px-4 bg-slate-50/50 dark:bg-slate-900/40 shrink-0">
              {MANUAL_CONFIGS.map((config) => (
                <button
                  key={config.id}
                  onClick={() => setActiveTab(config.id)}
                  className={cn(
                    'relative px-4 py-2.5 text-xs font-medium transition-colors select-none cursor-pointer outline-none',
                    activeTab === config.id
                      ? 'text-purple-600 dark:text-purple-400 font-semibold'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                  )}
                >
                  <span>{t(config.titleKey as any)}</span>
                  {activeTab === config.id && (
                    <motion.div
                      layoutId="activeManualTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600 dark:bg-purple-400"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Main content body */}
            <div className="flex flex-1 overflow-hidden">
              {loading ? (
                <div className="flex flex-1 items-center justify-center text-xs text-slate-400">
                  {t('common.loading')}
                </div>
              ) : (
                <>
                  {/* Left Column: Chapters Directory */}
                  <div className="w-44 border-r border-slate-100 dark:border-slate-850 bg-slate-50/50 dark:bg-slate-900/30 p-3 shrink-0 flex flex-col gap-1 overflow-y-auto select-none">
                    <span className="px-2 py-1 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
                      目录章节
                    </span>
                    {chapters.map((ch) => (
                      <button
                        key={ch.index}
                        onClick={() => handleChapterClick(ch.index)}
                        className={cn(
                          'w-full px-2.5 py-1.5 rounded-lg text-left text-[11px] leading-relaxed transition-all flex items-center justify-between group',
                          activeChapter === ch.index
                            ? 'bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 font-semibold border-l-2 border-purple-500 rounded-l-none pl-2'
                            : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-850 hover:text-slate-800 dark:hover:text-slate-200'
                        )}
                      >
                        <span className="truncate">{ch.title}</span>
                        <ChevronRight className={cn(
                          'w-3 h-3 shrink-0 transition-transform opacity-0 group-hover:opacity-100',
                          activeChapter === ch.index && 'opacity-100 text-purple-500'
                        )} />
                      </button>
                    ))}
                  </div>

                  {/* Right Column: Markdown Content Area */}
                  <div 
                    ref={contentRef}
                    className="flex-1 overflow-y-auto px-6 py-5 scroll-smooth"
                  >
                    {renderMarkdown(markdown)}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
