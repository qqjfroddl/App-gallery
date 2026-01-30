
import React from 'react';

interface HeaderProps {
  onSearch: (query: string) => void;
  onSettingsClick: () => void;
  isAdmin: boolean;
}

const Header: React.FC<HeaderProps> = ({ onSearch, onSettingsClick, isAdmin }) => {
  return (
    <header className="sticky top-0 z-50 w-full glass border-b border-white/5 py-4">
      <div className="max-w-[1920px] mx-auto px-6 flex items-center justify-between gap-10">
        
        {/* 브랜드 로고 */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="w-10 h-10 bg-gradient-to-br from-point-blue to-point-purple rounded-xl flex items-center justify-center shadow-2xl shadow-point-blue/30 border border-white/10">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-black tracking-tighter text-white uppercase italic">Gallery.IO</h1>
          </div>
        </div>

        {/* 메인 검색 필드 */}
        <div className="flex-1 max-w-2xl">
          <div className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-600 group-focus-within:text-point-blue transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              className="block w-full pl-12 pr-4 py-3 bg-white/5 border border-white/5 rounded-2xl focus:ring-4 focus:ring-point-blue/20 focus:bg-white/10 text-base placeholder-gray-600 transition-all text-white font-medium outline-none"
              placeholder="프로젝트 검색..."
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
        </div>

        {/* 액션 버튼 - 관리자 전환 버튼만 남김 */}
        <div className="flex items-center gap-4 shrink-0">
          <button 
            onClick={onSettingsClick}
            className={`flex items-center gap-3 px-5 py-2.5 rounded-2xl font-bold text-sm transition-all border ${
              isAdmin 
              ? 'bg-point-purple text-white shadow-lg shadow-point-purple/40 border-point-purple' 
              : 'glass border-white/10 text-gray-400 hover:text-white hover:border-white/30'
            }`}
          >
            <svg className={`w-5 h-5 ${isAdmin ? 'animate-spin-slow' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="hidden md:inline">{isAdmin ? '관리 종료' : '관리자 로그인'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
