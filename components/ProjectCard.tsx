
import React, { useState } from 'react';
import { Project } from '../types';
import { getCategoryStyles } from '../App';

interface ProjectCardProps {
  project: Project;
  isAdmin?: boolean;
  onDelete?: (id: string) => void;
  onEdit?: () => void;
  allCategories: string[]; // 색상 스타일링을 위해 전체 카테고리 목록 필요
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  isAdmin, 
  onDelete, 
  onEdit,
  allCategories
}) => {
  const [imageError, setImageError] = useState(false);

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onDelete) {
      onDelete(project.id);
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onEdit) {
      onEdit();
    }
  };

  return (
    <div className="group glass-card glass rounded-2xl overflow-hidden transition-all duration-500 flex flex-col border border-white/5 relative h-full hover:translate-y-[-8px] shadow-2xl">
      
      {isAdmin && (
        <div className="absolute top-3 right-3 z-50 flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
          <button 
            type="button"
            onClick={handleEdit}
            className="w-10 h-10 rounded-xl bg-point-blue hover:bg-point-blue/90 text-white flex items-center justify-center shadow-2xl border border-white/10 active:scale-90"
            title="프로젝트 수정"
          >
            <svg className="w-5 h-5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
          <button 
            type="button"
            onClick={handleDelete}
            className="w-10 h-10 rounded-xl bg-red-600 hover:bg-red-500 text-white flex items-center justify-center shadow-2xl border border-white/10 active:scale-90"
            title="프로젝트 삭제"
          >
            <svg className="w-5 h-5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      )}

      <div className="relative aspect-[16/10] overflow-hidden bg-[#080808]">
        {!imageError ? (
          <img
            key={project.imageUrl}
            src={project.imageUrl}
            alt={project.name}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-white/5">
            <span className="text-[9px] font-black opacity-20 tracking-[0.2em] uppercase">미리보기 없음</span>
          </div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300"></div>
        
        {/* 카테고리 배지 표시 */}
        <div className="absolute bottom-3 left-4 flex flex-wrap gap-1.5 pr-4">
          {project.categories.map((cat) => {
            const styles = getCategoryStyles(allCategories, cat);
            return (
              <span key={cat} className={`text-[8px] text-white font-black ${styles.badge} backdrop-blur-xl px-2 py-0.5 rounded-md border ${styles.border} tracking-widest uppercase shadow-xl`}>
                {cat}
              </span>
            );
          })}
        </div>
      </div>

      <div className="p-5 flex flex-col justify-between flex-1 gap-5 bg-[#080808]">
        <div className="min-w-0">
          <h3 className="text-2xl font-black text-white group-hover:text-point-blue transition-colors truncate tracking-tighter mb-1.5 leading-none">
            {project.name}
          </h3>
          <p className="text-[8px] text-gray-700 truncate font-mono tracking-tight opacity-50 group-hover:opacity-80 transition-opacity">
            {project.url}
          </p>
        </div>
        
        <div className="flex justify-end items-center pt-3 border-t border-white/5">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-point-blue text-gray-500 hover:text-white transition-all text-[10px] font-black border border-white/5 hover:border-point-blue/50"
          >
            <span className="tracking-widest uppercase">사이트 이동</span>
            <svg className="w-3 h-3 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
