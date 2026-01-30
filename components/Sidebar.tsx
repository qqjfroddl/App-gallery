
import React, { useState, useEffect } from 'react';

interface SidebarProps {
  categories: string[];
  onAddCategory: (name: string) => void;
  onDeleteCategory: (name: string) => void;
  onAddProject: (name: string, url: string, categories: string[]) => void;
  getCategoryStyles: (cat: string) => any;
  onExport?: () => void;
  onReset?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  categories, 
  onAddCategory, 
  onDeleteCategory, 
  onAddProject,
  getCategoryStyles,
  onExport,
  onReset
}) => {
  const [nameInput, setNameInput] = useState('');
  const [urlInput, setUrlInput] = useState('');
  const [newCategoryInput, setNewCategoryInput] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    setSelectedCategories(prev => prev.filter(c => categories.includes(c)));
  }, [categories]);

  const toggleCategorySelection = (cat: string) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const handleAddProject = () => {
    if (urlInput.trim() && selectedCategories.length > 0) {
      onAddProject(nameInput, urlInput, selectedCategories);
      setUrlInput('');
      setNameInput('');
      setSelectedCategories([]);
    } else if (selectedCategories.length === 0) {
      alert('최소 하나 이상의 카테고리를 선택해주세요.');
    } else if (!urlInput.trim()) {
      alert('URL을 입력해주세요.');
    }
  };

  const handleAddCategory = () => {
    const trimmed = newCategoryInput.trim();
    if (trimmed) {
      onAddCategory(trimmed);
      setNewCategoryInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent, callback: () => void) => {
    if (e.key === 'Enter') {
      callback();
    }
  };

  return (
    <aside className="w-full lg:w-96 shrink-0 space-y-6">
      <div className="sticky top-24 space-y-6 pb-20">
        
        {/* 프로젝트 추가 카드 */}
        <div className="glass rounded-2xl p-6 border border-white/5 shadow-xl">
          <h3 className="text-lg font-bold mb-2 text-white uppercase italic tracking-tight">Add New Project</h3>
          <p className="text-gray-500 text-[11px] font-medium mb-6 leading-relaxed">
            웹사이트의 이름과 URL을 입력하여 갤러리에 추가하세요.
          </p>
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-1.5 ml-1">Name</label>
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                onKeyDown={(e) => handleKeyPress(e, handleAddProject)}
                className="block w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-point-blue/50 text-sm text-white transition-all outline-none"
                placeholder="App Name"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-1.5 ml-1">URL Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.826L10.242 9.172a4 4 0 015.656 0l4 4a4 4 0 01-5.656 5.656l-1.102 1.102" />
                  </svg>
                </div>
                <input
                  type="url"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  onKeyDown={(e) => handleKeyPress(e, handleAddProject)}
                  className="block w-full pl-9 pr-3 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-point-blue/50 text-sm text-white transition-all outline-none font-mono"
                  placeholder="https://..."
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-1.5 ml-1">Categories (Multi)</label>
              <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-1 custom-scroll">
                {categories.map((cat) => {
                  const styles = getCategoryStyles(cat);
                  const isSelected = selectedCategories.includes(cat);
                  return (
                    <button
                      key={cat}
                      onClick={() => toggleCategorySelection(cat)}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all border uppercase tracking-widest ${
                        isSelected
                          ? `${styles.active} text-white ${styles.border} shadow-lg scale-105`
                          : 'bg-white/5 border-white/5 text-gray-600 hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              onClick={handleAddProject}
              disabled={!urlInput.trim() || selectedCategories.length === 0}
              className={`w-full font-black py-4 px-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-2xl text-[10px] uppercase tracking-[0.2em] ${
                !urlInput.trim() || selectedCategories.length === 0
                  ? 'bg-gray-800 text-gray-600 cursor-not-allowed shadow-none'
                  : 'bg-point-blue hover:bg-point-blue/90 text-white shadow-point-blue/40'
              }`}
            >
              Add Project
            </button>
          </div>
        </div>

        {/* 카테고리 관리 카드 */}
        <div className="glass rounded-2xl p-6 border border-white/5">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-lg font-bold text-white uppercase italic tracking-tight">Categories</h3>
            <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-gray-400 font-bold">{categories.length}</span>
          </div>
          <div className="space-y-4 mt-6">
            <div className="flex gap-2">
              <input
                type="text"
                value={newCategoryInput}
                onChange={(e) => setNewCategoryInput(e.target.value)}
                onKeyDown={(e) => handleKeyPress(e, handleAddCategory)}
                className="block flex-1 px-4 py-2.5 bg-white/5 border border-white/5 rounded-xl focus:ring-2 focus:ring-point-blue/50 text-xs text-white outline-none"
                placeholder="New Category..."
              />
              <button 
                onClick={handleAddCategory}
                className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl transition-all text-white active:scale-95"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1 custom-scroll">
              {categories.map((cat) => {
                const styles = getCategoryStyles(cat);
                return (
                  <div 
                    key={cat} 
                    className="flex items-center justify-between px-4 py-3 rounded-xl bg-white/[0.02] border border-white/5 group hover:bg-white/[0.04] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${styles.active.replace('bg-', 'bg-')}`}></div>
                      <span className="text-xs font-bold text-gray-400 group-hover:text-white uppercase tracking-wider">{cat}</span>
                    </div>
                    <button 
                      onClick={() => onDeleteCategory(cat)}
                      className="text-gray-700 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 p-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 데이터 관리 액션 (내보내기/초기화) */}
        <div className="grid grid-cols-2 gap-3 mt-10">
          <button 
            onClick={onReset}
            className="py-4 px-4 rounded-2xl glass border-white/5 text-[10px] font-black text-gray-700 hover:text-red-400 hover:border-red-500/20 transition-all uppercase tracking-widest"
          >
            Reset All
          </button>
          <button 
            onClick={onExport}
            className="py-4 px-4 rounded-2xl bg-white text-black text-[10px] font-black hover:bg-point-blue hover:text-white transition-all uppercase tracking-widest shadow-2xl shadow-white/10"
          >
            Export JSON
          </button>
        </div>

      </div>
    </aside>
  );
};

export default Sidebar;
