
import React, { useState, useMemo, useCallback } from 'react';
import { DEFAULT_CATEGORIES, Project } from './types';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ProjectCard from './components/ProjectCard';

// 카테고리별 색상 테마 정의
export const getCategoryStyles = (categories: string[], categoryName: string) => {
  const index = categories.indexOf(categoryName);
  const themes = [
    { active: 'bg-blue-600', border: 'border-blue-500/30', text: 'text-blue-400', badge: 'bg-blue-600/80', shadow: 'shadow-blue-600/40' },
    { active: 'bg-purple-600', border: 'border-purple-500/30', text: 'text-purple-400', badge: 'bg-purple-600/80', shadow: 'shadow-purple-600/40' },
    { active: 'bg-emerald-600', border: 'border-emerald-500/30', text: 'text-emerald-400', badge: 'bg-emerald-600/80', shadow: 'shadow-emerald-600/40' },
    { active: 'bg-orange-600', border: 'border-orange-500/30', text: 'text-orange-400', badge: 'bg-orange-600/80', shadow: 'shadow-orange-600/40' },
    { active: 'bg-rose-600', border: 'border-rose-500/30', text: 'text-rose-400', badge: 'bg-rose-600/80', shadow: 'shadow-rose-600/40' },
    { active: 'bg-indigo-600', border: 'border-indigo-500/30', text: 'text-indigo-400', badge: 'bg-indigo-600/80', shadow: 'shadow-indigo-600/40' },
  ];
  if (index === -1) return themes[0];
  return themes[index % themes.length];
};

const INITIAL_PROJECTS: Project[] = [
  {
    id: '1',
    name: 'TaskFlow',
    url: 'https://taskflow.io',
    categories: [DEFAULT_CATEGORIES.SIDE_PROJECT],
    imageUrl: 'https://s0.wp.com/mshots/v1/https%3A%2F%2Ftaskflow.io?w=800',
    addedAt: new Date('2024-01-10'),
  },
  {
    id: '2',
    name: 'CryptoDash',
    url: 'https://cryptodash.example.com',
    categories: [DEFAULT_CATEGORIES.SIDE_PROJECT, DEFAULT_CATEGORIES.LABS],
    imageUrl: 'https://s0.wp.com/mshots/v1/https%3A%2F%2Fcryptodash.example.com?w=800',
    addedAt: new Date('2024-02-15'),
  },
  {
    id: '3',
    name: 'DevTools Pro',
    url: 'https://devtools-pro.web.app',
    categories: [DEFAULT_CATEGORIES.CLIENT_WORK],
    imageUrl: 'https://s0.wp.com/mshots/v1/https%3A%2F%2Fdevtools-pro.web.app?w=800',
    addedAt: new Date('2024-03-05'),
  },
  {
    id: '4',
    name: 'Analytica',
    url: 'https://analytica-insight.com',
    categories: [DEFAULT_CATEGORIES.LABS],
    imageUrl: 'https://s0.wp.com/mshots/v1/https%3A%2F%2Fanalytica-insight.com?w=800',
    addedAt: new Date('2024-03-20'),
  },
];

const App: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [categories, setCategories] = useState<string[]>([
    DEFAULT_CATEGORIES.SIDE_PROJECT,
    DEFAULT_CATEGORIES.CLIENT_WORK,
    DEFAULT_CATEGORIES.LABS,
  ]);
  const [activeCategory, setActiveCategory] = useState<string>(DEFAULT_CATEGORIES.ALL);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [editTarget, setEditTarget] = useState<Project | null>(null);

  const handleAdminAuth = () => {
    if (passwordInput === '2026') {
      setIsAdmin(true);
      setShowAdminModal(false);
      setPasswordInput('');
    } else {
      alert('비밀번호가 올바르지 않습니다.');
    }
  };

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory = activeCategory === DEFAULT_CATEGORIES.ALL || project.categories.includes(activeCategory);
      const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          project.url.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [projects, activeCategory, searchQuery]);

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

  const handleDeleteRequest = useCallback((id: string) => {
    setDeleteTargetId(id);
  }, []);

  const confirmDelete = () => {
    if (deleteTargetId) {
      setProjects((prev) => prev.filter(p => p.id !== deleteTargetId));
      setDeleteTargetId(null);
    }
  };

  const handleAddCategory = useCallback((name: string) => {
    if (!categories.includes(name)) {
      setCategories((prev) => [...prev, name]);
    }
  }, [categories]);

  const handleDeleteCategory = useCallback((name: string) => {
    setCategories((prev) => prev.filter((c) => c !== name));
    if (activeCategory === name) {
      setActiveCategory(DEFAULT_CATEGORIES.ALL);
    }
  }, [activeCategory]);

  const toggleEditCategory = (cat: string) => {
    if (!editTarget) return;
    const newCats = editTarget.categories.includes(cat)
      ? editTarget.categories.filter(c => c !== cat)
      : [...editTarget.categories, cat];
    setEditTarget({ ...editTarget, categories: newCats });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#050505] text-white selection:bg-point-blue/30 selection:text-white">
      <Header 
        onSearch={setSearchQuery} 
        onSettingsClick={() => isAdmin ? setIsAdmin(false) : setShowAdminModal(true)}
        isAdmin={isAdmin}
      />

      <main className="flex-1 max-w-[1920px] mx-auto w-full px-6 py-12">
        <div className="flex flex-col gap-14">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-10">
            <div className="space-y-4">
              <div className="flex items-center gap-5">
                <h2 className="text-6xl font-black tracking-tighter italic">GALLERY</h2>
                {isAdmin && (
                  <div className="flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-point-purple/10 border border-point-purple/40 text-point-purple font-black text-[11px] uppercase tracking-[0.2em] shadow-2xl shadow-point-purple/20">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-point-purple opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-point-purple"></span>
                    </span>
                    Admin active
                  </div>
                )}
              </div>
              <p className="text-gray-600 text-xl font-medium max-w-2xl leading-relaxed">
                {isAdmin ? '관리자 모드입니다. 프로젝트 수정, 삭제 및 새로운 앱 등록이 가능합니다.' : '다양한 웹 애플리케이션 프로젝트를 한눈에 관리하는 대시보드입니다.'}
              </p>
            </div>
            
            <div className="flex gap-2.5 overflow-x-auto pb-4 md:pb-0 custom-scroll no-scrollbar">
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
            <div className="flex-1 w-full order-2 lg:order-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {filteredProjects.length > 0 ? (
                  filteredProjects.map((project) => (
                    <ProjectCard 
                      key={project.id} 
                      project={project} 
                      isAdmin={isAdmin}
                      onDelete={handleDeleteRequest}
                      onEdit={() => setEditTarget(project)}
                      allCategories={categories}
                    />
                  ))
                ) : (
                  <div className="col-span-full py-48 text-center glass rounded-[40px] border border-dashed border-white/5 bg-white/[0.01]">
                    <p className="text-gray-700 font-black text-xs uppercase tracking-[0.4em] italic">No active projects</p>
                  </div>
                )}
              </div>
            </div>

            {isAdmin && (
              <div className="w-full lg:w-[420px] shrink-0 order-1 lg:order-2 animate-in slide-in-from-right duration-700">
                <Sidebar 
                  categories={categories}
                  onAddCategory={handleAddCategory}
                  onDeleteCategory={handleDeleteCategory}
                  onAddProject={handleAddProject} 
                  getCategoryStyles={(cat) => getCategoryStyles(categories, cat)}
                />
              </div>
            )}
          </div>
        </div>
      </main>

      {editTarget && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
          <div className="glass rounded-[40px] w-full max-w-md p-10 border border-point-blue/20 shadow-[0_0_100px_rgba(59,130,246,0.1)] animate-in fade-in zoom-in duration-300">
            <h3 className="text-3xl font-black text-white mb-8 tracking-tighter uppercase">Project Update</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Name</label>
                <input
                  type="text"
                  value={editTarget.name}
                  onChange={(e) => setEditTarget({...editTarget, name: e.target.value})}
                  className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-point-blue/50 text-white outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">URL</label>
                <input
                  type="text"
                  value={editTarget.url}
                  onChange={(e) => setEditTarget({...editTarget, url: e.target.value})}
                  className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-point-blue/50 text-white outline-none font-mono text-sm"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Categories (다중 선택)</label>
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
                Cancel
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
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteTargetId && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
          <div className="glass rounded-[40px] w-full max-w-sm p-12 border border-red-500/20 shadow-[0_0_100px_rgba(239,68,68,0.1)] animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 bg-red-500/10 rounded-3xl flex items-center justify-center text-red-500 mb-8 border border-red-500/20">
              <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-2xl font-black text-white mb-2 tracking-tighter uppercase">프로젝트 삭제</h3>
            <p className="text-gray-500 text-base mb-10 font-medium">이 프로젝트를 영구적으로 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.</p>
            <div className="flex gap-4">
              <button 
                onClick={() => setDeleteTargetId(null)}
                className="flex-1 py-5 px-4 rounded-2xl glass text-gray-500 hover:text-white transition-all font-black text-xs uppercase"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDelete}
                className="flex-1 py-5 px-4 rounded-2xl bg-red-600 hover:bg-red-500 text-white transition-all font-black text-xs uppercase shadow-2xl shadow-red-600/30"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {showAdminModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl">
          <div className="glass rounded-[50px] w-full max-w-md p-14 border border-white/10 shadow-[0_0_150px_rgba(59,130,246,0.1)] animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 bg-point-blue/10 rounded-[30px] flex items-center justify-center text-point-blue mb-10 border border-point-blue/30 shadow-2xl">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-4xl font-black text-white mb-4 tracking-tighter">SECURE LOGIN</h3>
            <p className="text-gray-600 text-lg mb-10 font-medium leading-snug">갤러리 관리를 위한 인증 코드를 입력하세요.</p>
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
                Cancel
              </button>
              <button 
                onClick={handleAdminAuth}
                className="flex-1 py-6 px-4 rounded-[20px] bg-point-blue hover:bg-point-blue/90 text-white transition-all font-black text-xs uppercase tracking-widest shadow-2xl shadow-point-blue/40"
              >
                Verify
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="max-w-[1920px] mx-auto px-6 py-20 border-t border-white/5 mt-32 w-full">
        <div className="flex justify-center items-center text-gray-700 text-xs font-bold tracking-widest">
          <p className="tracking-tighter opacity-50 uppercase text-center">&copy; 2026 Deeptactlearning. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
