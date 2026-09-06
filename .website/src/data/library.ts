import advancedMathematics from '../content/advanced_mathematics.md?raw';
import advancedMathematics1 from '../content/advanced_mathematics_1.md?raw';
import analogElectronics from '../content/analog_electronics.md?raw';
import cLanguage from '../content/c_language.md?raw';
import circuit from '../content/circuit.md?raw';
import collegeChinese from '../content/college_chinese.md?raw';
import collegeEnglish from '../content/college_english.md?raw';
import computerNetwork from '../content/computer_network.md?raw';
import complexFunctions from '../content/complex_functions.md?raw';
import controlEngineering from '../content/control_engineering.md?raw';
import dataStructure from '../content/data_structure.md?raw';
import developerManual from '../content/developer_manual.md?raw';
import digitalElectronics from '../content/digital_electronics.md?raw';
import digitalSignalProcessing from '../content/digital_signal_processing.md?raw';
import engineeringDrawing from '../content/engineering_drawing.md?raw';
import ethicsAndLaw from '../content/ethics_and_law.md?raw';
import java from '../content/java.md?raw';
import linearAlgebra from '../content/linear_algebra.md?raw';
import management from '../content/management.md?raw';
import mao from '../content/mao.md?raw';
import marxistPrinciples from '../content/marxist_principles.md?raw';
import microcomputer from '../content/microcomputer.md?raw';
import modernChineseHistory from '../content/modern_chinese_history.md?raw';
import probabilityStatistics from '../content/probability&statistics.md?raw';
import campusSurvival from '../content/campus_survival.md?raw';
import colleges from '../content/colleges.md?raw';
import unix from '../content/unix.md?raw';
import universityPhysics from '../content/university_physics.md?raw';
import userManual from '../content/user_manual.md?raw';
import web from '../content/web.md?raw';
import { eieCoursePages } from './eie';
import type { LibraryPage, LibrarySection, SearchResult } from '../types';

export const librarySections: LibrarySection[] = [
  {
    id: 'campus-survival',
    title: '校内生存技巧',
    pages: [
      {
        id: 'campus-portals',
        title: '常用校内入口',
        summary: '统一门户、教务系统和校内交流入口。',
        content: campusSurvival,
        legacyPath: 'docs/campus_survival.md',
      },
      {
        id: 'colleges',
        title: '学院与培养方案',
        summary: '各教学单位官网和本科培养方案查询入口。',
        content: colleges,
        legacyPath: 'docs/colleges.md',
        keywords: [
          '农学院', '植物保护学院', '林学与风景园林学院', '园艺学院', '兽医学院', '动物科学学院',
          '资源环境学院', '海洋学院', '生命科学学院', '工程学院', '食品学院', '水利与土木工程学院',
          '数学与信息学院', '软件学院', '人工智能与低空技术学院', '材料与化学工程学院', '生物质学院',
          '马克思主义学院', '经济管理学院', '公共管理学院', '人文与法学学院', '外国语学院',
          '湾区设计与艺术学院', '体育学院', '继续教育学院', '国际教育学院', '都柏林学院', '培养方案',
        ],
      },
    ],
  },
  {
    id: 'site-guide',
    title: '站点指南',
    pages: [
      {
        id: 'user-manual',
        title: '用户手册',
        summary: '资料浏览、检索和反馈方式。',
        content: userManual,
        legacyPath: 'docs/user_manual.md',
      },
      {
        id: 'developer-manual',
        title: '开发者手册',
        summary: '站点结构、本地开发和内容维护。',
        content: developerManual,
        legacyPath: 'docs/developer_manual.md',
      },
    ],
  },
  {
    id: 'courses',
    title: '课程资料',
    pages: [
      {
        id: 'unix',
        title: 'Unix',
        summary: '考试范围、历年试卷与课后习题答案。',
        content: unix,
        legacyPath: 'docs/unix.md',
        textbook: {
          isbn: '978-7-121-29641-3',
          coverSrc: './covers/unix.webp',
          coverAlt: 'Unix 课程教材封面',
          coverWidth: 560,
          coverHeight: 560,
        },
      },
      {
        id: 'web-development',
        title: 'Web 开发',
        summary: '课程资料与期末考试范围。',
        content: web,
        legacyPath: 'docs/web.md',
        textbook: {
          isbn: '978-7-115-57754-2',
          coverSrc: './covers/web-development.webp',
          coverAlt: 'Web 开发课程教材封面',
          coverWidth: 500,
          coverHeight: 500,
        },
      },
      { id: 'digital-signal-processing', title: '数字信号处理', summary: '复习提纲、题库、专项练习与往年试卷。', content: digitalSignalProcessing, legacyPath: 'docs/digital_signal_processing.md' },
      { id: 'data-structure', title: '数据结构', summary: '复习笔记与 2011-2025 年历年试卷答案。', content: dataStructure, legacyPath: 'docs/data_structure.md' },
      {
        id: 'java',
        title: 'Java 程序设计',
        summary: '2010-2018 年期末试题与参考答案。',
        content: java,
        legacyPath: 'docs/java.md',
        keywords: ['Java语言程序设计', 'JAVA程序设计', '期末考试', 'A卷', 'B卷'],
      },
      ...eieCoursePages,
      { id: 'c-language', title: 'C 语言程序设计', summary: '考试范围、题库、历年试卷、习题解答与课件。', content: cLanguage, legacyPath: 'docs/c-language.md', keywords: ['C语言', '程序设计', '公共C题库'] },
      { id: 'engineering-drawing', title: '工程制图 B', summary: '复习资料、历年试卷、习题解答与课件。', content: engineeringDrawing, legacyPath: 'docs/engineering-drawing.md', keywords: ['工程制图', '机械制图', '工图'] },
      { id: 'microcomputer', title: '微机原理', summary: '复习、考试、实验、教材与接口技术课件。', content: microcomputer, legacyPath: 'docs/microcomputer.md', keywords: ['微机原理与接口技术', '8086', '汇编'] },
      { id: 'control-engineering', title: '控制工程', summary: '自动控制原理试卷、题库、习题解答与课件。', content: controlEngineering, legacyPath: 'docs/control-engineering.md', keywords: ['自动控制原理', '自控'] },
      { id: 'complex-functions', title: '复变函数与积分变换', summary: '2009-2025 年试卷、复习资料、习题解答与课件。', content: complexFunctions, legacyPath: 'docs/complex-functions.md', keywords: ['复变函数', '积分变换'] },
      { id: 'digital-electronics', title: '数字电子技术', summary: '复习资料、题库、历年试卷、习题解答与课件。', content: digitalElectronics, legacyPath: 'docs/digital-electronics.md', keywords: ['数电', '数字电路'] },
      { id: 'analog-electronics', title: '模拟电子技术', summary: '复习、题库、试卷、仿真文件、习题答案与课件。', content: analogElectronics, legacyPath: 'docs/analog-electronics.md', keywords: ['模电', '模拟电路', 'Multisim'] },
      { id: 'circuit', title: '电路', summary: '复习资料、历年试卷、习题解答与课程课件。', content: circuit, legacyPath: 'docs/circuit.md', keywords: ['电路原理'] },
      { id: 'university-physics', title: '大学物理 A', summary: '课后习题与 2018 级课程课件。', content: universityPhysics, legacyPath: 'docs/university-physics.md', keywords: ['大学物理', '大物'] },
      { id: 'college-english', title: '大学英语', summary: '课程资料、课文翻译与配套习题答案。', content: collegeEnglish, legacyPath: 'docs/college-english.md', keywords: ['新视野大学英语', '读写', '视听说'] },
      { id: 'college-chinese', title: '大学语文', summary: '课程复习与阅读资料。', content: collegeChinese, legacyPath: 'docs/college-chinese.md' },
      { id: 'ethics-and-law', title: '思想道德与法治', summary: '2018 年复习资料、题库与往年试题。', content: ethicsAndLaw, legacyPath: 'docs/ethics-and-law.md', keywords: ['思修', '思修法基', '思想道德修养与法律基础'] },
      { id: 'modern-chinese-history', title: '中国近现代史纲要', summary: '课程复习资料。', content: modernChineseHistory, legacyPath: 'docs/modern-chinese-history.md', keywords: ['近代史', '中国近代史纲要'] },
      { id: 'marxist-principles', title: '马克思主义基本原理', summary: '复习资料、课件与历年试卷。', content: marxistPrinciples, legacyPath: 'docs/marxist-principles.md', keywords: ['马原', '马克思主义基本原理概论'] },
      { id: 'advanced-mathematics-1', title: '高等数学 I', summary: '章节题库、历年试卷与外校参考试卷。', content: advancedMathematics1, legacyPath: 'docs/advanced-mathematics-1.md', keywords: ['高数AI', '高数上', '高等数学上'] },
      {
        id: 'probability-statistics',
        title: '概率论与数理统计',
        summary: '历年试卷、答案与教材信息。',
        content: probabilityStatistics,
        legacyPath: 'docs/probability&statistics.md',
        textbook: {
          isbn: '978-7-115-48826-8',
          coverSrc: './covers/probability-statistics.webp',
          coverAlt: '概率论与数理统计课程教材封面',
          coverWidth: 512,
          coverHeight: 720,
        },
      },
      {
        id: 'computer-network',
        title: '通信与计算机网络',
        summary: '课程题库与教材信息。',
        content: computerNetwork,
        legacyPath: 'docs/computer_network.md',
        textbook: {
          isbn: '978-7-04-046269-2',
          coverSrc: './covers/computer-network.webp',
          coverAlt: '通信与计算机网络课程教材封面',
          coverWidth: 551,
          coverHeight: 720,
        },
      },
      {
        id: 'management',
        title: '管理学',
        summary: '考试资料、考点与参考答案。',
        content: management,
        legacyPath: 'docs/management.md',
        textbook: {
          isbn: '978-7-04-045832-9',
          coverSrc: './covers/management.webp',
          coverAlt: '管理学课程教材封面',
          coverWidth: 513,
          coverHeight: 720,
        },
      },
      { id: 'mao', title: '毛泽东思想和中国特色社会主义理论体系概论', summary: '历年考试资料。', content: mao, legacyPath: 'docs/mao.md' },
      { id: 'advanced-mathematics', title: '高等数学 II', summary: '章节题库、复习范围与历年试卷答案。', content: advancedMathematics, legacyPath: 'docs/advanced_mathematics.md', keywords: ['高数II', '高数AII', '高数BII', '高等数学下'] },
      { id: 'linear-algebra', title: '线性代数', summary: '历年试卷、课件与习题解答。', content: linearAlgebra, legacyPath: 'docs/linear_algebra.md' },
    ],
  },
];

const sectionOrder = ['site-guide', 'courses', 'campus-survival'];
librarySections.sort((left, right) => sectionOrder.indexOf(left.id) - sectionOrder.indexOf(right.id));

export const allPages = librarySections.flatMap((section) => section.pages);

export function getPage(id: string): LibraryPage | undefined {
  return allPages.find((page) => page.id === id || page.legacyPath === id);
}

export function getSectionForPage(pageId: string): LibrarySection | undefined {
  return librarySections.find((section) => section.pages.some((page) => page.id === pageId));
}

export function searchLibrary(query: string): SearchResult {
  const normalized = query.trim().toLocaleLowerCase('zh-CN');
  if (!normalized) {
    return { sections: librarySections, pageCount: allPages.length };
  }

  const sections = librarySections
    .map((section) => ({
      ...section,
      pages: section.pages.filter((page) =>
        `${section.title} ${page.title} ${page.summary} ${page.keywords?.join(' ') ?? ''}`
          .toLocaleLowerCase('zh-CN')
          .includes(normalized),
      ),
    }))
    .filter((section) => section.pages.length > 0);

  return {
    sections,
    pageCount: sections.reduce((total, section) => total + section.pages.length, 0),
  };
}
