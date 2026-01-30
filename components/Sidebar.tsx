
import React, { useState, useEffect } from 'react';

interface SidebarProps {
  categories: string[];
  onAddCategory: (name: string) => void;
  onDeleteCategory: (name: string) => void;
  onAddProject: (name: string, url: string, categories: string[]) => void;
  getCategoryStyles: (cat: string) => any;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  categories, 
  onAddCategory, 
  onDeleteCategory, 
  onAddProject,
  getCategoryStyles
}) => {
  const [nameInput, setNameInput] = useState('');
  const [urlInput, setUrlInput] = useState('');
  const [newCategoryInput, setNewCategoryInput] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // 초기 카테고리 로드 시 첫 번째 선택 방지 혹은 유지 (사용자가 직접 선택 유도)
  useEffect(() => {
    // 유효하지 않은 카테고리 제거
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
      <div className="sticky top-24 space-y-6">
        
        <div className="glass rounded-2xl p-6 border border-white/5 shadow-xl">
          <h3 className="text-lg font-bold mb-2 text-white">빠른 추가</h3>
          <p className="text-gray-400 text-sm mb-6 leading-relaxed">
            웹사이트의 이름과 URL을 입력하여 프로젝트를 관리하세요. (다중 카테고리 선택 가능)
          </p>
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">프로젝트 이름</label>
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                onKeyDown={(e) => handleKeyPress(e, handleAddProject)}
                className="block w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-point-blue/50 text-sm text-white transition-all"
                placeholder="예: 내 포트폴리오"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">URL 주소</label>
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
                  className="block w-full pl-9 pr-3 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-point-blue/50 text-sm text-white transition-all"
                  placeholder="https://example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">카테고리 선택 (중복 가능)</label>
              <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-1 custom-scroll">
                {categories.map((cat) => {
                  const styles = getCategoryStyles(cat);
                  const isSelected = selectedCategories.includes(cat);
                  return (
                    <button
                      key={cat}
                      onClick={() => toggleCategorySelection(cat)}
                      className={`px-3 py-2 rounded-lg text-[11px] font-bold transition-all border ${
                        isSelected
                          ? `${styles.active.replace('bg-', 'bg-')}/20 ${styles.border.replace('border-', 'border-')} ${styles.text} shadow-sm`
                          : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20 hover:text-gray-200'
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
              className={`w-full font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg mt-2 ${
                !urlInput.trim() || selectedCategories.length === 0
                  ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                  : 'bg-point-blue hover:bg-point-blue/90 text-white shadow-point-blue/20'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              프로젝트 추가
            </button>
          </div>
        </div>

        <div className="glass rounded-2xl p-6 border border-white/5">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-lg font-bold text-white">카테고리 관리</h3>
            <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-gray-400 font-bold">{categories.length}</span>
          </div>
          <p className="text-gray-400 text-sm mb-6 leading-relaxed">
            분류를 위한 사용자 지정 카테고리를 추가하거나 삭제합니다.
          </p>
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={newCategoryInput}
                onChange={(e) => setNewCategoryInput(e.target.value)}
                onKeyDown={(e) => handleKeyPress(e, handleAddCategory)}
                className="block flex-1 px-4 py-2.5 bg-[#121212] border border-white/10 rounded-xl focus:ring-2 focus:ring-point-blue/50 text-sm text-white"
                placeholder="새 카테고리명..."
              />
              <button 
                onClick={handleAddCategory}
                className="w-10 h-10 flex items-center justify-center bg-[#1a1a1a] hover:bg-[#252525] border border-white/10 rounded-xl transition-all text-white active:scale-95"
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
                    className={`flex items-center justify-between px-4 py-3 rounded-xl bg-[#141414] border-l-4 ${styles.border.replace('border-', 'border-')} group hover:bg-white/[0.02] transition-colors`}
                  >
                    <span className={`text-sm font-semibold ${styles.text}`}>{cat}</span>
                    <button 
                      onClick={() => onDeleteCategory(cat)}
                      className="text-gray-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 p-1"
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

      </div>
    </aside>
  );
};

export default Sidebar;
