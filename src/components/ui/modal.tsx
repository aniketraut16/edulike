import { useEffect, useRef, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    title?: string;
    className?: string;
    closeOnEscape?: boolean;
    closeOnOverlay?: boolean;
}

export function Modal({
    isOpen,
    onClose,
    children,
    title,
    className,
    closeOnEscape = true,
    closeOnOverlay = true,
}: ModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (closeOnEscape && e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose, closeOnEscape]);

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (closeOnOverlay && modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return createPortal(
        <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200"
            onClick={handleOverlayClick}
        >
            <div
                ref={modalRef}
                className={cn(
                    "bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200",
                    className
                )}
                onClick={(e) => e.stopPropagation()}
            >
                {title && (
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X size={24} />
                        </button>
                    </div>
                )}
                <div className="p-6 overflow-y-auto">{children}</div>
            </div>
        </div>,
        document.body
    );
} 