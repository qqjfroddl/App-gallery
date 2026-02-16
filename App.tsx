
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { DEFAULT_CATEGORIES, Project } from './types';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ProjectCard from './components/ProjectCard';

// 카테고리별 색상 테마 정의 (블루, 퍼플 등을 기본으로 사용)
export const getCategoryStyles = (categories: string[], categoryName: string) => {
  const index = categories.indexOf(categoryName);
  const themes = [
    { active: 'bg-blue-600', border: 'border-blue-500/30', text: 'text-blue-400', badge: 'bg-blue-600/80', shadow: 'shadow-blue-600/40' },
    { active: 'bg-purple-600', border: 'border-purple-500/30', text: 'text-purple-400', badge: 'bg-purple-600/80', shadow: 'shadow-purple-600/40' },
    { active: 'bg-emerald-600', border: 'border-emerald-500/30', text: 'text-emerald-400', badge: 'bg-emerald-600/80', shadow: 'shadow-emerald-600/40' },
    { active: 'bg-orange-600', border: 'border-orange-500/30', text: 'text-orange-400', badge: 'bg-orange-600/80', shadow: 'shadow-orange-600/40' },
    { active: 'bg-rose-600', border: 'border-rose-500/30', text: 'text-rose-400', badge: 'bg-rose-600/80', shadow: 'shadow-rose-600/40' },
    { active: 'bg-indigo-600', border: 'border-indigo-500/30', text: 'text-indigo-400', badge: 'bg-indigo-600/80', shadow: 'shadow-indigo-600/40' },
    { active: 'bg-cyan-600', border: 'border-cyan-500/30', text: 'text-cyan-400', badge: 'bg-cyan-600/80', shadow: 'shadow-cyan-600/40' },
  ];
  if (index === -1) return themes[0];
  return themes[index % themes.length];
};

/**
 * 기본 프로젝트 데이터 (제공된 최신 29개 데이터셋)
 */
const INITIAL_PROJECTS: Project[] = [
  {
    id: "1771248047193",
    name: "노트북LM 슬라이드 프롬프트",
    url: "https://claude.ai/public/artifacts/a612f6c9-f0e3-48f5-aa85-ba91a8f5fe49",
    categories: ["업무생산성", "프롬프트", "PPT문서작성"],
    imageUrl: "https://s0.wp.com/mshots/v1/https%3A%2F%2Fclaude.ai%2Fpublic%2Fartifacts%2Fa612f6c9-f0e3-48f5-aa85-ba91a8f5fe49?w=800",
    addedAt: new Date("2026-02-16T13:20:47.193Z")
  },
  {
    id: "1771203747057",
    name: "노트북LM 슬라이드 편집기",
    url: "https://notebooklm.referencehrd.com",
    categories: ["업무생산성", "PPT문서작성"],
    imageUrl: "https://s0.wp.com/mshots/v1/https%3A%2F%2Fnotebooklm.referencehrd.com?w=800",
    addedAt: new Date("2026-02-16T01:02:27.057Z")
  },
  {
    id: "1771117846479",
    name: "노트북LM 슬라이드 텍스트수정",
    url: "https://ai.studio/apps/drive/1kN24k1VN8ztcIQf3k8yD1v0NpgQUSu3Z?fullscreenApplet=true",
    categories: ["업무생산성", "PPT문서작성"],
    imageUrl: "https://s0.wp.com/mshots/v1/https%3A%2F%2Fai.studio%2Fapps%2Fdrive%2F1kN24k1VN8ztcIQf3k8yD1v0NpgQUSu3Z%3FfullscreenApplet%3Dtrue?w=800",
    addedAt: new Date("2026-02-15T01:10:46.479Z")
  },
  {
    id: "1771117727277",
    name: "PDF/이미지 올리면 자동 자막+나레이션",
    url: "https://ai.studio/apps/drive/1P1at0V2g-4YIK7oEI2vl1J5jCiZeU8Ay?fullscreenApplet=true",
    categories: ["업무생산성", "바이브코딩", "동영상"],
    imageUrl: "https://s0.wp.com/mshots/v1/https%3A%2F%2Fai.studio%2Fapps%2Fdrive%2F1P1at0V2g-4YIK7oEI2vl1J5jCiZeU8Ay%3FfullscreenApplet%3Dtrue?w=800",
    addedAt: new Date("2026-02-15T01:08:47.277Z")
  },
  {
    id: "1770276327317",
    name: "대시보드_소방서 화재진압현황",
    url: "https://gemini.google.com/share/79fd25008c89",
    categories: ["업무생산성", "대시보드"],
    imageUrl: "https://s0.wp.com/mshots/v1/https%3A%2F%2Fgemini.google.com%2Fshare%2F79fd25008c89?w=800",
    addedAt: new Date("2026-02-05T07:25:27.317Z")
  },
  {
    id: "1769763462349",
    name: "인생관리",
    url: "https://led-with-ai.vercel.app/",
    categories: ["업무생산성"],
    imageUrl: "https://s0.wp.com/mshots/v1/https%3A%2F%2Fled-with-ai.vercel.app%2F?w=800",
    addedAt: new Date("2026-01-30T08:57:42.349Z")
  },
  {
    id: "1769837827574",
    name: "2026 AI UI 디자인 프롬프트 생성기",
    url: "https://gemini.google.com/share/5cd8d32fee6e",
    categories: ["디자인", "바이브코딩", "프롬프트"],
    imageUrl: "https://s0.wp.com/mshots/v1/https%3A%2F%2Fgemini.google.com%2Fshare%2F5cd8d32fee6e?w=800",
    addedAt: new Date("2026-01-31T05:37:07.574Z")
  },
  {
    id: "1769843668362",
    name: "바이브코딩 UI 마크다운 생성기 초보자용",
    url: "https://rinooks7.cafe24.com/vibe/ui_design/",
    categories: ["디자인", "바이브코딩", "프롬프트"],
    imageUrl: "https://s0.wp.com/mshots/v1/https%3A%2F%2Frinooks7.cafe24.com%2Fvibe%2Fui_design%2F?w=800",
    addedAt: new Date("2026-01-31T07:14:28.362Z")
  },
  {
    id: "1769844715410",
    name: "웹툰 생성기",
    url: "https://ai.studio/apps/drive/1BgGj2o18wnW3l6_QgZm-2KvtobWQjyW4?fullscreenApplet=true",
    categories: ["PPT문서작성", "기타", "디자인"],
    imageUrl: "https://s0.wp.com/mshots/v1/https%3A%2F%2Fai.studio%2Fapps%2Fdrive%2F1BgGj2o18wnW3l6_QgZm-2KvtobWQjyW4%3FfullscreenApplet%3Dtrue?w=800",
    addedAt: new Date("2026-01-31T07:31:55.410Z")
  },
  {
    id: "1769843882992",
    name: "회의록 생성기 (음성기반)",
    url: "https://gemini.google.com/share/4fc1853b8981",
    categories: ["업무생산성", "PPT문서작성"],
    imageUrl: "https://s0.wp.com/mshots/v1/https%3A%2F%2Fgemini.google.com%2Fshare%2F4fc1853b8981?w=800",
    addedAt: new Date("2026-01-31T07:18:02.992Z")
  },
  {
    id: "1769843976276",
    name: "트렌드, 뉴스 요약",
    url: "https://aistudio.google.com/apps/drive/1pq1w5C4QAnlXYZUHYljfBTDx5nLyLRm8?fullscreenApplet=true&showPreview=true&showAssistant=true",
    categories: ["업무생산성", "PPT문서작성"],
    imageUrl: "https://s0.wp.com/mshots/v1/https%3A%2F%2Faistudio.google.com%2Fapps%2Fdrive%2F1pq1w5C4QAnlXYZUHYljfBTDx5nLyLRm8%3FfullscreenApplet%3Dtrue%26showPreview%3Dtrue%26showAssistant%3Dtrue?w=800",
    addedAt: new Date("2026-01-31T07:19:36.276Z")
  },
  {
    id: "1769844032312",
    name: "PDF변환기 (PPT, Word, 이미지추출)",
    url: "https://gemini.google.com/share/ceb5f6f1ce95",
    categories: ["업무생산성", "PPT문서작성"],
    imageUrl: "https://s0.wp.com/mshots/v1/https%3A%2F%2Fgemini.google.com%2Fshare%2Fceb5f6f1ce95?w=800",
    addedAt: new Date("2026-01-31T07:20:32.312Z")
  },
  {
    id: "1769843842032",
    name: "거래명세서 생성기",
    url: "https://gemini.google.com/share/83e482ad4139",
    categories: ["업무생산성", "PPT문서작성"],
    imageUrl: "https://s0.wp.com/mshots/v1/https%3A%2F%2Fgemini.google.com%2Fshare%2F83e482ad4139?w=800",
    addedAt: new Date("2026-01-31T07:17:22.032Z")
  },
  {
    id: "1769843807453",
    name: "견적서 생성기",
    url: "https://gemini.google.com/share/1a4ba47f82f6",
    categories: ["업무생산성", "PPT문서작성"],
    imageUrl: "https://s0.wp.com/mshots/v1/https%3A%2F%2Fgemini.google.com%2Fshare%2F1a4ba47f82f6?w=800",
    addedAt: new Date("2026-01-31T07:16:47.453Z")
  },
  {
    id: "1769849575201",
    name: "AI 쇼츠 영상 제작 도우미",
    url: "https://gemini.google.com/share/5831dff87d6d",
    categories: ["동영상", "프롬프트"],
    imageUrl: "https://s0.wp.com/mshots/v1/https%3A%2F%2Fgemini.google.com%2Fshare%2F5831dff87d6d?w=800",
    addedAt: new Date("2026-01-31T08:52:55.201Z")
  },
  {
    id: "1769849512112",
    name: " EV 충전 커넥트 (서울/경기 실시간 충전 포털)",
    url: "https://gemini.google.com/share/85c9d3fb4c40",
    categories: ["기타"],
    imageUrl: "https://s0.wp.com/mshots/v1/https%3A%2F%2Fgemini.google.com%2Fshare%2F85c9d3fb4c40?w=800",
    addedAt: new Date("2026-01-31T08:51:52.112Z")
  },
  {
    id: "1769849497519",
    name: "기업 분석 & 채용 솔루션",
    url: "https://gemini.google.com/share/7f55df595e9b",
    categories: ["기타"],
    imageUrl: "https://s0.wp.com/mshots/v1/https%3A%2F%2Fgemini.google.com%2Fshare%2F7f55df595e9b?w=800",
    addedAt: new Date("2026-01-31T08:51:37.519Z")
  },
  {
    id: "1769849433251",
    name: "이미지-3D 변환 IMAGE TO VOXEL ART",
    url: "https://ai.studio/apps/bundled/image_to_voxel?fullscreenApplet=true",
    categories: ["디자인"],
    imageUrl: "https://s0.wp.com/mshots/v1/https%3A%2F%2Fai.studio%2Fapps%2Fbundled%2Fimage_to_voxel%3FfullscreenApplet%3Dtrue?w=800",
    addedAt: new Date("2026-01-31T08:50:33.251Z")
  },
  {
    id: "1769849561446",
    name: "게임_사무실 탈출",
    url: "https://gemini.google.com/share/beb0141ed32b",
    categories: ["기타"],
    imageUrl: "https://s0.wp.com/mshots/v1/https%3A%2F%2Fgemini.google.com%2Fshare%2Fbeb0141ed32b?w=800",
    addedAt: new Date("2026-01-31T08:52:41.446Z")
  },
  {
    id: "1769849382727",
    name: "전국 연수 장소 map",
    url: "https://gemini.google.com/share/9e62b7f683b6",
    categories: ["기타"],
    imageUrl: "https://s0.wp.com/mshots/v1/https%3A%2F%2Fgemini.google.com%2Fshare%2F9e62b7f683b6?w=800",
    addedAt: new Date("2026-01-31T08:49:42.727Z")
  },
  {
    id: "1769849340692",
    name: "연하장 제작소",
    url: "https://service-2026-ai-233075408916.us-west1.run.app/",
    categories: ["기타", "PPT문서작성"],
    imageUrl: "https://s0.wp.com/mshots/v1/https%3A%2F%2Fservice-2026-ai-233075408916.us-west1.run.app%2F?w=800",
    addedAt: new Date("2026-01-31T08:49:00.692Z")
  },
  {
    id: "1769844251823",
    name: "표창장 생성기",
    url: "https://gemini.google.com/share/ab91896f7fcd",
    categories: ["업무생산성", "PPT문서작성"],
    imageUrl: "https://s0.wp.com/mshots/v1/https%3A%2F%2Fgemini.google.com%2Fshare%2Fab91896f7fcd?w=800",
    addedAt: new Date("2026-01-31T07:24:11.823Z")
  },
  {
    id: "1769844191929",
    name: "Remove Watermark from NotebookLM Video Overviews",
    url: "https://www.notebooklmwatermark.com/video-watermark-remover",
    categories: ["동영상", "디자인"],
    imageUrl: "https://s0.wp.com/mshots/v1/https%3A%2F%2Fwww.notebooklmwatermark.com%2Fvideo-watermark-remover?w=800",
    addedAt: new Date("2026-01-31T07:23:11.929Z")
  },
  {
    id: "1769844146192",
    name: "나노바나나 디자인 프롬프트",
    url: "https://furoku.github.io/bananaX/projects/infographic-evaluation/ko/",
    categories: ["디자인", "바이브코딩", "프롬프트"],
    imageUrl: "https://s0.wp.com/mshots/v1/https%3A%2F%2Ffuroku.github.io%2FbananaX%2Fprojects%2Finfographic-evaluation%2Fko%2F?w=800",
    addedAt: new Date("2026-01-31T07:22:26.192Z")
  },
  {
    id: "1769849545450",
    name: "이번 주 급식 뭐지?",
    url: "https://gemini.google.com/share/be75bc99ad40",
    categories: ["기타"],
    imageUrl: "https://s0.wp.com/mshots/v1/https%3A%2F%2Fgemini.google.com%2Fshare%2Fbe75bc99ad40?w=800",
    addedAt: new Date("2026-01-31T08:52:25.450Z")
  },
  {
    id: "1769844110624",
    name: "2026 AI UI Prompt Generator",
    url: "https://ai-ui-design-prompt-generator.vercel.app/",
    categories: ["업무생산성", "바이브코딩", "프롬프트", "디자인"],
    imageUrl: "https://s0.wp.com/mshots/v1/https%3A%2F%2Fai-ui-design-prompt-generator.vercel.app%2F?w=800",
    addedAt: new Date("2026-01-31T07:21:50.624Z")
  },
  {
    id: "1769843699004",
    name: "프롬프트",
    url: "https://www.prpt.ai/prompt/list",
    categories: ["프롬프트"],
    imageUrl: "https://s0.wp.com/mshots/v1/https%3A%2F%2Fwww.prpt.ai%2Fprompt%2Flist?w=800",
    addedAt: new Date("2026-01-31T07:14:59.004Z")
  },
  {
    id: "1769849464173",
    name: "게임_Road Fight",
    url: "https://gemini.google.com/share/34212c109b69",
    categories: ["게임"],
    imageUrl: "https://s0.wp.com/mshots/v1/https%3A%2F%2Fgemini.google.com%2Fshare%2F34212c109b69?w=800",
    addedAt: new Date("2026-01-31T08:51:04.173Z")
  },
  {
    id: "1769849358699",
    name: "게임_인형뽑기",
    url: "https://gemini.google.com/share/fa1a07849353",
    categories: ["게임"],
    imageUrl: "https://s0.wp.com/mshots/v1/https%3A%2F%2Fgemini.google.com%2Fshare%2Ffa1a07849353?w=800",
    addedAt: new Date("2026-01-31T08:49:18.699Z")
  }
];

/**
 * 기본 카테고리 리스트 (9개 항목)
 */
const INITIAL_CATEGORIES = [
  "업무생산성",
  "디자인",
  "바이브코딩",
  "PPT문서작성",
  "동영상",
  "프롬프트",
  "게임",
  "기타",
  "대시보드"
];

// 저장소 버전 업데이트 (v1.9 -> v2.0)
const STORAGE_KEYS = {
  PROJECTS: 'gallery_projects_v2.0',
  CATEGORIES: 'gallery_categories_v2.0',
};

const App: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // 날짜 문자열을 Date 객체로 복원
        return parsed.map((p: any) => ({ ...p, addedAt: new Date(p.addedAt) }));
      } catch (e) {
        return INITIAL_PROJECTS;
      }
    }
    return INITIAL_PROJECTS;
  });

  const [categories, setCategories] = useState<string[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_CATEGORIES;
      }
    }
    return INITIAL_CATEGORIES;
  });

  const [activeCategory, setActiveCategory] = useState<string>(DEFAULT_CATEGORIES.ALL);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [editTarget, setEditTarget] = useState<Project | null>(null);
  const [showExportModal, setShowExportModal] = useState(false);

  // 드래그 앤 드롭 상태 관리
  const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);

  // 프로젝트 데이터 변경 시 로컬 저장소 업데이트
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  }, [projects]);

  // 카테고리 데이터 변경 시 로컬 저장소 업데이트
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  }, [categories]);

  // 관리자 인증 처리 (비밀번호: 2026)
  const handleAdminAuth = () => {
    if (passwordInput === '2026') {
      setIsAdmin(true);
      setShowAdminModal(false);
      setPasswordInput('');
    } else {
      alert('비밀번호가 올바르지 않습니다.');
    }
  };

  // 검색 및 카테고리 필터링된 프로젝트 목록
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory = activeCategory === DEFAULT_CATEGORIES.ALL || project.categories.includes(activeCategory);
      const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          project.url.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [projects, activeCategory, searchQuery]);

  // 프로젝트 추가 핸들러
  const handleAddProject = useCallback((name: string, url: string, selectedCategories: string[]) => {
    const formattedUrl = url.startsWith('http') ? url : `https://${url}`;
    const screenshotUrl = `https://s0.wp.com/mshots/v1/${encodeURIComponent(formattedUrl)}?w=800`;
    
    const newProject: Project = {
      id: Date.now().toString(),
      name: name || formattedUrl.replace('https://', '').replace('http://', '').split(/[./]/)[0], 
      url: formattedUrl,
      categories: selectedCategories,
      imageUrl: screenshotUrl,
      addedAt: new Date(),
    };
    setProjects((prev) => [newProject, ...prev]);
  }, []);

  // 프로젝트 정보 업데이트 핸들러
  const handleUpdateProject = (updatedProject: Project) => {
    setProjects((prev) => 
      prev.map((p) => (p.id === updatedProject.id ? {
        ...updatedProject,
        imageUrl: updatedProject.url !== p.url 
          ? `https://s0.wp.com/mshots/v1/${encodeURIComponent(updatedProject.url.startsWith('http') ? updatedProject.url : `https://${updatedProject.url}`)}?w=800`
          : p.imageUrl
      } : p))
    );
    setEditTarget(null);
  };

  // 프로젝트 삭제 요청 처리
  const handleDeleteRequest = useCallback((id: string) => {
    setDeleteTargetId(id);
  }, []);

  // 삭제 최종 확인
  const confirmDelete = () => {
    if (deleteTargetId) {
      setProjects((prev) => prev.filter(p => p.id !== deleteTargetId));
      setDeleteTargetId(null);
    }
  };

  // 카테고리 추가
  const handleAddCategory = useCallback((name: string) => {
    if (!categories.includes(name)) {
      setCategories((prev) => [...prev, name]);
    }
  }, [categories]);

  // 카테고리 삭제 (해당 카테고리를 가진 프로젝트에서도 제거됨)
  const handleDeleteCategory = useCallback((name: string) => {
    setProjects(prev => prev.map(p => ({
      ...p,
      categories: p.categories.filter(c => c !== name)
    })));
    setCategories((prev) => prev.filter((c) => c !== name));
    if (activeCategory === name) setActiveCategory(DEFAULT_CATEGORIES.ALL);
  }, [activeCategory]);

  // 모든 데이터를 기본값으로 초기화
  const handleResetData = () => {
    if (confirm('모든 데이터를 초기값으로 되돌리시겠습니까? 직접 추가한 모든 정보가 삭제됩니다.')) {
      setProjects(INITIAL_PROJECTS);
      setCategories(INITIAL_CATEGORIES);
      localStorage.clear();
      alert('초기화가 완료되었습니다.');
    }
  };

  /**
   * 프로젝트 드래그 앤 드롭 정렬 로직 (관리자 모드 전용)
   */
  const handleDragStart = (index: number) => {
    if (!isAdmin) return;
    setDraggedItemIndex(index);
  };

  const handleDragEnter = (targetIndex: number) => {
    if (!isAdmin || draggedItemIndex === null || draggedItemIndex === targetIndex) return;
    
    const newProjects = [...projects];
    const itemToMove = filteredProjects[draggedItemIndex];
    const targetItem = filteredProjects[targetIndex];
    
    const actualFromIndex = projects.findIndex(p => p.id === itemToMove.id);
    const actualToIndex = projects.findIndex(p => p.id === targetItem.id);
    
    newProjects.splice(actualFromIndex, 1);
    newProjects.splice(actualToIndex, 0, itemToMove);
    
    setProjects(newProjects);
    setDraggedItemIndex(targetIndex);
  };

  const handleDragEnd = () => {
    setDraggedItemIndex(null);
  };

  // 수정 중인 프로젝트의 카테고리 토글
  const toggleEditCategory = (cat: string) => {
    if (!editTarget) return;
    const newCats = editTarget.categories.includes(cat)
      ? editTarget.categories.filter(c => c !== cat)
      : [...editTarget.categories, cat];
    setEditTarget({ ...editTarget, categories: newCats });
  };

  // 데이터 내보내기용 JSON 생성
  const exportData = () => {
    const data = { projects, categories };
    return JSON.stringify(data, null, 2);
  };

  // 내보내기 데이터 클립보드 복사
  const copyToClipboard = () => {
    navigator.clipboard.writeText(exportData());
    alert('데이터가 클립보드에 복사되었습니다!');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#050505] text-white selection:bg-point-blue/30 selection:text-white">
      {/* 상단 헤더 컴포넌트 */}
      <Header 
        onSearch={setSearchQuery} 
        onSettingsClick={() => isAdmin ? setIsAdmin(false) : setShowAdminModal(true)}
        isAdmin={isAdmin}
      />

      {/* 메인 콘텐츠 영역 */}
      <main className="flex-1 max-w-[1920px] mx-auto w-full px-6 py-12">
        <div className="flex flex-col gap-14">
          
          {/* 상단 필터 및 제목 섹션 */}
          <div className="border-b border-white/5 pb-10 space-y-10">
            <div className="space-y-4">
              <div className="flex items-center gap-5">
                <h2 className="text-6xl font-black tracking-tighter italic">GALLERY</h2>
                {isAdmin && (
                  <div className="flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-point-purple/10 border border-point-purple/40 text-point-purple font-black text-[11px] uppercase tracking-[0.2em] shadow-2xl shadow-point-purple/20">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-point-purple opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-point-purple"></span>
                    </span>
                    관리자 모드 활성
                  </div>
                )}
              </div>
              <p className="text-gray-600 text-xl font-medium max-w-4xl leading-relaxed">
                {isAdmin ? '프로젝트를 드래그하여 순서를 변경하거나 관리할 수 있습니다.' : '웹 애플리케이션 개발 프로젝트를 한눈에 볼 수 있는 갤러리 대시보드입니다.'}
              </p>
            </div>
            
            {/* 카테고리 필터 (줄바꿈 대응) */}
            <div className="flex flex-wrap gap-2.5">
              <button
                onClick={() => setActiveCategory(DEFAULT_CATEGORIES.ALL)}
                className={`px-8 py-3.5 rounded-2xl text-xs font-black transition-all whitespace-nowrap uppercase tracking-widest ${
                  activeCategory === DEFAULT_CATEGORIES.ALL
                    ? 'bg-white text-black shadow-2xl shadow-white/10 scale-105'
                    : 'glass text-gray-500 hover:text-white'
                }`}
              >
                {DEFAULT_CATEGORIES.ALL}
              </button>
              {categories.map((cat) => {
                const styles = getCategoryStyles(categories, cat);
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-8 py-3.5 rounded-2xl text-xs font-black transition-all whitespace-nowrap uppercase tracking-widest ${
                      activeCategory === cat
                        ? `${styles.active} text-white shadow-2xl ${styles.shadow} scale-105`
                        : 'glass text-gray-500 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-10 items-start">
            {/* 프로젝트 갤러리 그리드 */}
            <div className="flex-1 w-full order-2 lg:order-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {filteredProjects.length > 0 ? (
                  filteredProjects.map((project, index) => (
                    <ProjectCard 
                      key={project.id} 
                      project={project} 
                      index={index}
                      isAdmin={isAdmin}
                      isDragging={draggedItemIndex === index}
                      onDelete={handleDeleteRequest}
                      onEdit={() => setEditTarget(project)}
                      onDragStart={() => handleDragStart(index)}
                      onDragEnter={() => handleDragEnter(index)}
                      onDragEnd={handleDragEnd}
                      allCategories={categories}
                    />
                  ))
                ) : (
                  <div className="col-span-full py-48 text-center glass rounded-[40px] border border-dashed border-white/5 bg-white/[0.01]">
                    <p className="text-gray-700 font-black text-xs uppercase tracking-[0.4em] italic">등록된 프로젝트가 없습니다</p>
                  </div>
                )}
              </div>
            </div>

            {/* 관리자 사이드바 (추가/관리 도구) */}
            {isAdmin && (
              <div className="w-full lg:w-[420px] shrink-0 order-1 lg:order-2 animate-in slide-in-from-right duration-700">
                <Sidebar 
                  categories={categories}
                  onAddCategory={handleAddCategory}
                  onDeleteCategory={handleDeleteCategory}
                  onAddProject={handleAddProject} 
                  getCategoryStyles={(cat) => getCategoryStyles(categories, cat)}
                  onExport={() => setShowExportModal(true)}
                  onReset={handleResetData}
                />
              </div>
            )}
          </div>
        </div>
      </main>

      {/* 데이터 내보내기 모달 */}
      {showExportModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl">
          <div className="glass rounded-[40px] w-full max-w-2xl p-10 border border-white/10 animate-in fade-in zoom-in duration-300">
            <h3 className="text-3xl font-black text-white mb-4 tracking-tighter uppercase italic">데이터 내보내기</h3>
            <p className="text-gray-500 text-sm mb-8">아래 JSON 텍스트를 복사하여 관리용으로 보관하거나 초기 데이터로 활용하세요.</p>
            <textarea 
              readOnly
              value={exportData()}
              className="w-full h-80 px-6 py-6 bg-[#080808] border border-white/5 rounded-3xl text-xs font-mono text-point-blue outline-none resize-none mb-8 custom-scroll"
            />
            <div className="flex gap-4">
              <button 
                onClick={() => setShowExportModal(false)}
                className="flex-1 py-5 rounded-2xl glass text-gray-500 hover:text-white transition-all font-black text-xs uppercase tracking-widest"
              >
                닫기
              </button>
              <button 
                onClick={copyToClipboard}
                className="flex-1 py-5 rounded-2xl bg-point-blue hover:bg-point-blue/90 text-white transition-all font-black text-xs uppercase tracking-widest shadow-2xl shadow-point-blue/30"
              >
                클립보드 복사
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 프로젝트 정보 수정 모달 */}
      {editTarget && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
          <div className="glass rounded-[40px] w-full max-w-md p-10 border border-point-blue/20 shadow-[0_0_100px_rgba(59,130,246,0.1)] animate-in fade-in zoom-in duration-300">
            <h3 className="text-3xl font-black text-white mb-8 tracking-tighter uppercase">프로젝트 정보 수정</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">이름</label>
                <input
                  type="text"
                  value={editTarget.name}
                  onChange={(e) => setEditTarget({...editTarget, name: e.target.value})}
                  className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-point-blue/50 text-white outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">URL 주소</label>
                <input
                  type="text"
                  value={editTarget.url}
                  onChange={(e) => setEditTarget({...editTarget, url: e.target.value})}
                  className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-point-blue/50 text-white outline-none font-mono text-sm"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">카테고리 (다중 선택)</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => {
                    const styles = getCategoryStyles(categories, cat);
                    const isSelected = editTarget.categories.includes(cat);
                    return (
                      <button
                        key={cat}
                        onClick={() => toggleEditCategory(cat)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                          isSelected
                            ? `${styles.active} text-white ${styles.border} shadow-lg`
                            : 'bg-white/5 border-white/10 text-gray-500'
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="flex gap-4 mt-12">
              <button 
                onClick={() => setEditTarget(null)}
                className="flex-1 py-5 rounded-2xl glass text-gray-500 hover:text-white transition-all font-black text-xs uppercase"
              >
                취소
              </button>
              <button 
                onClick={() => handleUpdateProject(editTarget)}
                disabled={editTarget.categories.length === 0}
                className={`flex-1 py-5 rounded-2xl transition-all font-black text-xs uppercase shadow-2xl ${
                  editTarget.categories.length === 0 
                  ? 'bg-gray-800 text-gray-600 cursor-not-allowed shadow-none' 
                  : 'bg-point-blue hover:bg-point-blue/90 text-white shadow-point-blue/40'
                }`}
              >
                저장하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 프로젝트 삭제 확인 모달 */}
      {deleteTargetId && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
          <div className="glass rounded-[40px] w-full max-w-sm p-12 border border-red-500/20 shadow-[0_0_100px_rgba(239,68,68,0.1)] animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 bg-red-500/10 rounded-3xl flex items-center justify-center text-red-500 mb-8 border border-red-500/20">
              <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-2xl font-black text-white mb-2 tracking-tighter uppercase">프로젝트 삭제</h3>
            <p className="text-gray-500 text-base mb-10 font-medium">정말 이 프로젝트를 삭제하시겠습니까? 삭제된 데이터는 복구할 수 없습니다.</p>
            <div className="flex gap-4">
              <button 
                onClick={() => setDeleteTargetId(null)}
                className="flex-1 py-5 px-4 rounded-2xl glass text-gray-500 hover:text-white transition-all font-black text-xs uppercase"
              >
                취소
              </button>
              <button 
                onClick={confirmDelete}
                className="flex-1 py-5 px-4 rounded-2xl bg-red-600 hover:bg-red-500 text-white transition-all font-black text-xs uppercase shadow-2xl shadow-red-600/30"
              >
                삭제하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 관리자 암호 인증 모달 */}
      {showAdminModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl">
          <div className="glass rounded-[50px] w-full max-w-md p-14 border border-white/10 shadow-[0_0_150px_rgba(59,130,246,0.1)] animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 bg-point-blue/10 rounded-[30px] flex items-center justify-center text-point-blue mb-10 border border-point-blue/30 shadow-2xl">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-4xl font-black text-white mb-4 tracking-tighter uppercase">관리자 로그인</h3>
            <p className="text-gray-600 text-lg mb-10 font-medium leading-snug">갤러리 관리를 위한 4자리 암호를 입력하세요.</p>
            <input
              type="password"
              value={passwordInput}
              autoFocus
              onChange={(e) => setPasswordInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAdminAuth()}
              className="w-full px-8 py-6 bg-white/5 border border-white/10 rounded-[24px] focus:ring-4 focus:ring-point-blue/30 text-white mb-10 text-center text-4xl font-black tracking-[0.8em] outline-none placeholder:text-gray-800 placeholder:tracking-normal transition-all"
              placeholder="••••"
            />
            <div className="flex gap-4">
              <button 
                onClick={() => setShowAdminModal(false)}
                className="flex-1 py-6 px-4 rounded-[20px] glass text-gray-500 hover:text-white transition-all font-black text-xs uppercase tracking-widest border-white/5"
              >
                취소
              </button>
              <button 
                onClick={handleAdminAuth}
                className="flex-1 py-6 px-4 rounded-[20px] bg-point-blue hover:bg-point-blue/90 text-white transition-all font-black text-xs uppercase tracking-widest shadow-2xl shadow-point-blue/40"
              >
                인증하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 푸터 영역 */}
      <footer className="max-w-[1920px] mx-auto px-6 py-20 border-t border-white/5 mt-32 w-full">
        <div className="flex justify-center items-center text-gray-700 text-xs font-bold tracking-widest">
          <p className="tracking-tighter opacity-50 uppercase text-center">&copy; 2026 Deeptactlearning. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
