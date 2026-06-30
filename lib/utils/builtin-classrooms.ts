// lib/utils/builtin-classrooms.ts

export interface BuiltinClassroomConfig {
  id: string;
  name: string;
  description: string;
  zipPath: string;
  color: string; // CSS gradient class
  tag: string;
  sceneCount: number;
}

export const BUILTIN_CLASSROOMS: BuiltinClassroomConfig[] = [
  {
    id: 'builtin-7days',
    name: '7天AI漫剧基础进阶精品班',
    description: '系统学习AI漫剧制作流程，零基础快速上手漫剧角色、分镜与动作设计，轻松创作出属于自己的第一部AI漫剧作品。',
    zipPath: '/classrooms/7天AI漫剧基础进阶精品班.maic.zip',
    color: 'from-blue-600 via-indigo-600 to-violet-600 dark:from-blue-900/60 dark:via-indigo-900/60 dark:to-violet-900/60',
    tag: '基础进阶',
    sceneCount: 7,
  },
  {
    id: 'builtin-14days',
    name: '14天AI漫剧短剧全流程进阶高手班',
    description: '打通AI漫剧与爆款短剧的全链路制作，深入解析剧本创作、后期特效与镜头语言，迈向AI影视创作高手行列。',
    zipPath: '/classrooms/14天AI漫剧短剧全流程进阶高手班.maic.zip',
    color: 'from-purple-600 via-pink-600 to-rose-600 dark:from-purple-900/60 dark:via-pink-900/60 dark:to-rose-900/60',
    tag: '进阶高手',
    sceneCount: 14,
  },
  {
    id: 'builtin-21days',
    name: '21天AI漫剧全能创业大师班',
    description: '全方位赋能AI漫剧商业化与创业变现，掌握账号运营、爆款逻辑以及多平台流量密码，实现从内容创作者到创业大师的跨越。',
    zipPath: '/classrooms/21天AI漫剧全能创业大师班.maic.zip',
    color: 'from-amber-600 via-orange-600 to-red-600 dark:from-amber-900/60 dark:via-orange-900/60 dark:to-red-900/60',
    tag: '创业大师',
    sceneCount: 21,
  },
];

export const BUILTIN_IDS = BUILTIN_CLASSROOMS.map((c) => c.id);

export function isBuiltinClassroomId(id: string): boolean {
  return BUILTIN_IDS.includes(id);
}

export function getBuiltinClassroomConfig(id: string): BuiltinClassroomConfig | undefined {
  return BUILTIN_CLASSROOMS.find((c) => c.id === id);
}
