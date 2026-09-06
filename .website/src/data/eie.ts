import type { LibraryPage } from '../types';

const RAW_BASE = 'https://github.com/AntheaLaffy/SCAU-learn/raw/refs/heads/main/';

export const eieImportedPaths = [
  "C语言/2020-2021第一学期_C语言试卷（A）.pdf",
  "C语言/2020-2021第一学期_C语言（A）参考答案.pdf",
  "C语言/2021-2022第一学期_C语言试卷（A）.pdf",
  "C语言/2021-2022第一学期_C语言（A）参考答案.pdf",
  "C语言/2023-2024第一学期_C语言试卷（A）最终版 .pdf",
  "C语言/2023-2024第一学期_C语言（A）参考答案 .pdf",
  "C语言/2024-2025（1）c语言考试题型和范围.pptx",
  "C语言/2024年公共C题库（含答案）.docx",
  "信号与系统/上半学期的考试试卷（偏难）/26.1信号与系统A.doc",
  "信号与系统/下半学期的考试试卷/14-15第二学期信号与系统A 答案.doc",
  "信号与系统/下半学期的考试试卷/14-15第二学期信号与系统A.doc",
  "信号与系统/下半学期的考试试卷/16-17第二学期信号与系统A.doc",
  "信号与系统/下半学期的考试试卷/16-17第二学期信号与系统A解答.doc",
  "信号与系统/没有答案的/习题/判断题.pdf",
  "信号与系统/没有答案的/习题/填空题.pdf",
  "信号与系统/没有答案的/习题/计算与分析题.pdf",
  "信号与系统/没有答案的/习题/试题-样例.docx",
  "信号与系统/没有答案的/习题/选择题.pdf",
  "单片机原理/往年试卷/单片机2018秋a2卷.pdf",
  "单片机原理/题库/单片机复习-题库（2019年12月考后补充了考题）.pdf",
  "复变函数/往年试题（不重要）/2020-2-复变函数与积分变换期末考试试卷-2020学.docx",
  "复变函数/往年试题（不重要）/2020-2021-1-复变函数与积分变换期末考试试卷及答案.pdf",
  "复变函数/往年试题（不重要）/2020-2021-2-复变函数与积分变换期末考试试卷-2020学年第二学期.pdf",
  "复变函数/往年试题（不重要）/2021-2022-1-复变函数与积分变换期末考试试卷及答案.pdf",
  "复变函数/往年试题（不重要）/2021第一学期复变函数与积分变换试卷及答案.pdf",
  "复变函数/往年试题（不重要）/2022-2023-1-复变函数与积分变换期末考试试卷-A卷.pdf",
  "复变函数/往年试题（不重要）/2022学年第一学期复变函数与积分变换(A卷)参.doc",
  "复变函数/往年试题（不重要）/2022学年第一学期期末考试试题-线上考试.pdf",
  "复变函数/往年试题（不重要）/2023-2024-2-复变函数与积分变换期末考试试卷+.pdf",
  "复变函数/往年试题（不重要）/2024-2025-2-复变函数与积分变换-A卷.pdf",
  "复变函数/题库/26年题库.pdf",
  "数字信号处理/ai总结的知识点.md",
  "数字信号处理/题库/202404数字信号处理---试题库含答案.pdf",
  "数字信号处理/题库/202504数字信号处理---试题库含答案.docx",
  "数据结构/EIE补充资料/2023？.pdf",
  "数据结构/EIE补充资料/数构.pdf",
  "数电/往年试题/2011学年第一学期A卷（含选择答案）.pdf",
  "数电/往年试题/2020春/5.1真值表.png",
  "数电/往年试题/2020春/数字电子技术试卷（A卷）-2020春.pdf",
  "数电/往年试题/2020春/数字电子技术试卷（答案）-2020春.pdf",
  "数电/往年试题/不知名试卷/试卷一.doc",
  "数电/往年试题/不知名试卷/试卷三.doc",
  "数电/往年试题/不知名试卷/试卷二.doc",
  "数电/往年试题/不知名试卷/试卷四.doc",
  "概率统计/历年试卷/2007/参考答案.pdf",
  "概率统计/历年试卷/2007/试卷.pdf",
  "概率统计/历年试卷/2008/参考答案.pdf",
  "概率统计/历年试卷/2008/试卷.pdf",
  "概率统计/历年试卷/2015-2016/试卷.pdf",
  "概率统计/历年试卷/2016-2017/版本1/参考答案.pdf",
  "概率统计/历年试卷/2016-2017/版本1/试卷.pdf",
  "概率统计/历年试卷/2018-2019/参考答案.pdf",
  "概率统计/历年试卷/2018-2019/试卷.pdf",
  "模电/15年模电试卷.pdf",
  "模电/16-17模电试卷.docx",
  "模电/小测答案/1.jpg",
  "模电/小测答案/2.jpg",
  "模电/小测答案/3.jpg",
  "模电/小测答案/4.jpg",
  "模电/小测答案/5.jpg",
  "模电/小测答案/6.jpg",
  "模电/小测答案/7.jpg",
  "电磁场与电磁波/2018春电磁场与电磁波试卷.doc",
  "电路/2016年电路试卷.zip",
  "电路/《电路》第五版课后习题参考答案.pdf",
  "电路/电路内容总结-2019.doc",
  "线性代数/历年试卷/2011/A卷及评分标准.doc",
  "线性代数/历年试卷/2012/A卷.doc",
  "线性代数/历年试卷/2012/A卷参考答案及评分标准.doc",
  "线性代数/历年试卷/2013/A卷.doc",
  "线性代数/历年试卷/2013/A卷参考答案及评分标准.doc",
  "线性代数/历年试卷/2024-2025/A卷.docx",
  "线性代数/历年试卷/2024-2025/A卷参考答案.pdf",
  "高数I/2018-2019高等数学A1（80学时）试卷及参考答案.doc",
  "高数I/题库/高数AI第一章试题库.pdf",
  "高数I/题库/高数AI第三章试题库.pdf",
  "高数I/题库/高数AI第二章试题库.pdf",
  "高数I/题库/高数AI第五章试题库.pdf",
  "高数I/题库/高数AI第四章试题库.pdf",
  "高数I/高数AI试卷(2004-2016).rar",
  "高数II/历年试卷/2011/试卷及参考答案.doc",
  "高数II/历年试卷/2012/试卷及参考答案（2014修订）.doc",
  "高数II/历年试卷/2013/试卷及参考答案.doc",
  "高数II/历年试卷/2014/试卷及参考答案.pdf",
  "高数II/历年试卷/2015/试卷及参考答案.doc",
  "高数II/历年试卷/2016/试卷及参考答案.doc",
  "高数II/历年试卷/2017/试卷及参考答案.doc",
  "高数II/章节题库/第06章.pdf",
  "高数II/章节题库/第07章.pdf",
  "高数II/章节题库/第08章.pdf",
  "高数II/章节题库/第09章.pdf",
  "高数II/章节题库/第10章.pdf",
  "高数II/章节题库/第11章.pdf"
] as const;

interface CourseConfig {
  id: string;
  title: string;
  summary: string;
  intro: string;
  prefixes: string[];
  keywords?: string[];
  newCourse?: boolean;
}

const courseConfigs: CourseConfig[] = [
  {
    id: 'c-language',
    title: 'C 语言程序设计',
    summary: '考试范围、公共题库与近年试卷答案。',
    intro: '这里收录了 C 语言程序设计的考试范围、公共题库以及 2020-2024 年试卷与参考答案。',
    prefixes: ['C语言/'],
    keywords: ['C语言', '程序设计', '公共C题库'],
    newCourse: true,
  },
  {
    id: 'signals-and-systems',
    title: '信号与系统',
    summary: '分类习题与历年考试试卷。',
    intro: '这里收录了信号与系统的分类练习题、样例题以及上下半学期历年试卷。',
    prefixes: ['信号与系统/'],
    keywords: ['信号系统', '判断题', '选择题', '填空题'],
    newCourse: true,
  },
  {
    id: 'microcontroller',
    title: '单片机原理',
    summary: '复习题库与往年试卷。',
    intro: '这里收录了单片机原理课程的复习题库与 2018 年秋季试卷。',
    prefixes: ['单片机原理/'],
    keywords: ['单片机', 'MCU'],
    newCourse: true,
  },
  {
    id: 'complex-functions',
    title: '复变函数与积分变换',
    summary: '2020-2025 年试卷与复习题库。',
    intro: '这里收录了复变函数与积分变换 2020-2025 年的期末试卷、参考答案与复习题库。',
    prefixes: ['复变函数/'],
    keywords: ['复变函数', '积分变换'],
    newCourse: true,
  },
  {
    id: 'digital-electronics',
    title: '数字电子技术',
    summary: '历年试卷、答案与真值表。',
    intro: '这里收录了数字电子技术历年试卷、参考答案以及相关真值表资料。',
    prefixes: ['数电/'],
    keywords: ['数电', '数字电路'],
    newCourse: true,
  },
  {
    id: 'analog-electronics',
    title: '模拟电子技术',
    summary: '历年试卷与小测答案。',
    intro: '这里收录了模拟电子技术历年试卷与七组小测答案。',
    prefixes: ['模电/'],
    keywords: ['模电', '模拟电路'],
    newCourse: true,
  },
  {
    id: 'electromagnetics',
    title: '电磁场与电磁波',
    summary: '课程往年试卷。',
    intro: '这里收录了电磁场与电磁波课程的往年考试试卷。',
    prefixes: ['电磁场与电磁波/'],
    keywords: ['电磁场', '电磁波'],
    newCourse: true,
  },
  {
    id: 'circuit',
    title: '电路',
    summary: '试卷、内容总结与习题答案。',
    intro: '这里收录了电路课程试卷、内容总结以及配套课后习题参考答案。',
    prefixes: ['电路/'],
    keywords: ['电路原理'],
    newCourse: true,
  },
  {
    id: 'advanced-mathematics-1',
    title: '高等数学 I',
    summary: '章节题库与历年试卷答案。',
    intro: '这里收录了高等数学 AI 的章节题库、历年试卷合集与参考答案。',
    prefixes: ['高数I/'],
    keywords: ['高数AI', '高数上', '高等数学上'],
    newCourse: true,
  },
  {
    id: 'digital-signal-processing',
    title: '数字信号处理',
    summary: '',
    intro: '',
    prefixes: ['数字信号处理/'],
  },
  {
    id: 'data-structure',
    title: '数据结构',
    summary: '',
    intro: '',
    prefixes: ['数据结构/EIE补充资料/'],
  },
];

const groupOrder = ['复习资料', '题库与练习', '试卷与资料', '答案与解析'];

function category(file: string): string {
  if (/题库|习题|专项/.test(file)) return '题库与练习';
  if (/答案|解答|评分标准|真值表/.test(file)) return '答案与解析';
  if (/范围|总结|知识点|考点/.test(file)) return '复习资料';
  return '试卷与资料';
}

function filesFor(config: CourseConfig): string[] {
  return eieImportedPaths.filter((file) => config.prefixes.some((prefix) => file.startsWith(prefix)));
}

const assignedFiles = new Set(courseConfigs.flatMap(filesFor));
if (assignedFiles.size !== eieImportedPaths.length) {
  throw new Error(`EIE resource catalog covers ${assignedFiles.size} of ${eieImportedPaths.length} imported files`);
}

function resourceGroups(files: string[], headingLevel = '##'): string {
  return groupOrder
    .map((group) => {
      const matching = files.filter((file) => category(file) === group);
      if (matching.length === 0) return '';
      const links = matching
        .map((file) => {
          const label = file.slice(file.lastIndexOf('/') + 1);
          return `- [${label}](<${RAW_BASE}${file}>)`;
        })
        .join('\n');
      return `${headingLevel} ${group}\n\n${links}`;
    })
    .filter(Boolean)
    .join('\n\n');
}

function pageContent(config: CourseConfig): string {
  return `# 课程介绍\n\n${config.intro}\n\n${resourceGroups(filesFor(config))}\n\n---\n\n资料仅供学习交流使用，具体考试范围请以任课教师通知为准。`;
}

export const eieCoursePages: LibraryPage[] = courseConfigs
  .filter((config) => config.newCourse)
  .map((config) => ({
    id: config.id,
    title: config.title,
    summary: config.summary,
    content: pageContent(config),
    legacyPath: `docs/${config.id}.md`,
    keywords: config.keywords,
  }));

export function eieSupplement(pageId: string): string {
  const config = courseConfigs.find((candidate) => candidate.id === pageId && !candidate.newCourse);
  if (!config) throw new Error(`Missing EIE supplement configuration for ${pageId}`);
  return `## 新增补充资料\n\n${resourceGroups(filesFor(config), '###')}`;
}
