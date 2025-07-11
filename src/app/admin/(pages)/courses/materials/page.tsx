'use client';

import { OneMaterial, MaterialArgs } from "@/app/admin/types/material";
import { getMaterials, createMaterial, updateMaterial, deleteMaterial } from "@/app/admin/utils/material";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash2, Video, Link, FileText, Calendar, ArrowLeft, Eye, FileQuestion } from "lucide-react";
import { useRouter } from "next/navigation";

type MaterialType = 'video' | 'live_session' | 'external_link' | 'document' | 'quiz';

interface QuizOption {
    id: string;
    text: string;
    isCorrect: boolean;
}

interface QuizQuestion {
    id: string;
    question: string;
    options: QuizOption[];
    explanation?: string;
    allowMultipleCorrect: boolean;
}

interface CreateMaterialForm {
    title: string;
    type: MaterialType;
    content: string;
    order_index: number;
    is_active: boolean;
    // Video specific
    file_path?: string;
    duration?: number;
    // Live session specific
    meet_link?: string;
    scheduled_at?: string;
    // External link specific
    external_url?: string;
}

function MaterialManagementPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const moduleId = searchParams.get("moduleId");
    const moduleTitle = searchParams.get("moduleTitle");

    const [materials, setMaterials] = useState<OneMaterial[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Modal states
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [quizQuestionsModalOpen, setQuizQuestionsModalOpen] = useState(false);
    const [selectedMaterial, setSelectedMaterial] = useState<OneMaterial | null>(null);

    // Form states
    const [createForm, setCreateForm] = useState<CreateMaterialForm>({
        title: '',
        type: 'video',
        content: '',
        order_index: 1,
        is_active: true,
    });

    const [editForm, setEditForm] = useState<CreateMaterialForm>({
        title: '',
        type: 'video',
        content: '',
        order_index: 1,
        is_active: true,
    });

    const [documentFile, setDocumentFile] = useState<File | null>(null);
    const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

    // Quiz questions state (for demonstration)
    const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
    const [newQuestion, setNewQuestion] = useState<QuizQuestion>({
        id: '',
        question: '',
        options: [
            { id: '1', text: '', isCorrect: false },
            { id: '2', text: '', isCorrect: false },
        ],
        explanation: '',
        allowMultipleCorrect: false
    });

    // Validation functions
    const validateVideoUrl = (url: string): boolean => {
        if (!url) return false;

        // Check if it's a YouTube URL
        const isYouTubeUrl = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//.test(url);
        if (isYouTubeUrl) return true;

        // Check if it's a direct video file with https
        const isDirectVideo = /^https:\/\/.*\.(mp4|mkv|webm|mov|avi|flv|wmv)$/i.test(url);
        return isDirectVideo;
    };

    const validateMeetLink = (url: string): boolean => {
        if (!url) return false;

        // Google Meet patterns
        const isGoogleMeet = /^https:\/\/meet\.google\.com\/[a-z0-9-]+$/i.test(url) ||
            /^https:\/\/meet\.google\.com\/[a-z0-9-]+\?[^?]*$/i.test(url);

        // Zoom patterns
        const isZoom = /^https:\/\/[^\.]*\.?zoom\.us\/j\/\d+(\?pwd=.*)?$/i.test(url) ||
            /^https:\/\/zoom\.us\/j\/\d+(\?pwd=.*)?$/i.test(url);

        return isGoogleMeet || isZoom;
    };

    const validateExternalUrl = (url: string): boolean => {
        if (!url) return false;
        return /^https:\/\//.test(url);
    };

    const validateForm = (form: CreateMaterialForm): { [key: string]: string } => {
        const errors: { [key: string]: string } = {};

        if (!form.title.trim()) {
            errors.title = 'Title is required';
        }

        switch (form.type) {
            case 'video':
                if (form.file_path && !validateVideoUrl(form.file_path)) {
                    errors.file_path = 'Must be a YouTube URL or direct video file URL starting with https:// and ending with .mp4, .mkv, .webm, .mov, .avi, .flv, or .wmv';
                }
                break;
            case 'live_session':
                if (form.meet_link && !validateMeetLink(form.meet_link)) {
                    errors.meet_link = 'Must be a valid Google Meet or Zoom meeting link';
                }
                break;
            case 'external_link':
                if (form.external_url && !validateExternalUrl(form.external_url)) {
                    errors.external_url = 'Must be a valid URL starting with https://';
                }
                break;
        }

        return errors;
    };

    // Quiz question handlers (for demonstration)
    const handleManageQuestions = (material: OneMaterial) => {
        setSelectedMaterial(material);
        // For demonstration, initialize with some sample questions
        setQuizQuestions([
            {
                id: '1',
                question: 'What is the capital of France?',
                options: [
                    { id: '1', text: 'London', isCorrect: false },
                    { id: '2', text: 'Paris', isCorrect: true },
                    { id: '3', text: 'Berlin', isCorrect: false },
                    { id: '4', text: 'Madrid', isCorrect: false },
                ],
                explanation: 'Paris is the capital and largest city of France.',
                allowMultipleCorrect: false
            }
        ]);
        setQuizQuestionsModalOpen(true);
    };

    const handleAddQuestion = () => {
        if (!newQuestion.question.trim()) {
            toast.error('Please enter a question');
            return;
        }

        const hasCorrectAnswer = newQuestion.options.some(option => option.isCorrect);
        if (!hasCorrectAnswer) {
            toast.error('Please select at least one correct answer');
            return;
        }

        // Check if all options have text
        const emptyOptions = newQuestion.options.filter(option => !option.text.trim());
        if (emptyOptions.length > 0) {
            toast.error('Please fill in all option texts');
            return;
        }

        const questionWithId = {
            ...newQuestion,
            id: Date.now().toString(),
        };

        setQuizQuestions(prev => [...prev, questionWithId]);

        // Reset form
        setNewQuestion({
            id: '',
            question: '',
            options: [
                { id: '1', text: '', isCorrect: false },
                { id: '2', text: '', isCorrect: false },
            ],
            explanation: '',
            allowMultipleCorrect: false
        });

        toast.success('Question added successfully!');
    };

    const handleDeleteQuestion = (questionId: string) => {
        setQuizQuestions(prev => prev.filter(q => q.id !== questionId));
        toast.success('Question deleted successfully!');
    };

    const updateQuestionOption = (optionId: string, field: 'text' | 'isCorrect', value: string | boolean) => {
        setNewQuestion(prev => ({
            ...prev,
            options: prev.options.map(option =>
                option.id === optionId
                    ? { ...option, [field]: value }
                    : field === 'isCorrect' && value === true && !prev.allowMultipleCorrect
                        ? { ...option, isCorrect: false } // Only one correct answer for single correct mode
                        : option
            )
        }));
    };

    const addOption = () => {
        if (newQuestion.options.length >= 6) return;

        const newOptionId = (newQuestion.options.length + 1).toString();
        setNewQuestion(prev => ({
            ...prev,
            options: [...prev.options, { id: newOptionId, text: '', isCorrect: false }]
        }));
    };

    const removeOption = () => {
        if (newQuestion.options.length <= 2) return;

        setNewQuestion(prev => ({
            ...prev,
            options: prev.options.slice(0, -1)
        }));
    };

    const toggleAnswerMode = () => {
        setNewQuestion(prev => ({
            ...prev,
            allowMultipleCorrect: !prev.allowMultipleCorrect,
            // Reset all correct answers when switching modes
            options: prev.options.map(option => ({ ...option, isCorrect: false }))
        }));
    };

    useEffect(() => {
        if (moduleId) {
            fetchMaterials();
        }
    }, [moduleId]);

    const fetchMaterials = async () => {
        if (!moduleId) return;

        setIsLoading(true);
        try {
            const materialsData = await getMaterials(moduleId);
            setMaterials(materialsData.sort((a, b) => a.order_index - b.order_index));
        } catch (error) {
            console.error('Error fetching materials:', error);
            toast.error('Failed to load materials');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateMaterial = async () => {
        if (!moduleId) return;

        // Validate form
        const errors = validateForm(createForm);
        setValidationErrors(errors);

        if (Object.keys(errors).length > 0) {
            toast.error('Please fix the validation errors');
            return;
        }

        try {
            const materialData: MaterialArgs = {
                module_id: moduleId,
                title: createForm.title,
                type: createForm.type,
                content: createForm.content,
                order_index: createForm.order_index,
                is_active: createForm.is_active,
            } as MaterialArgs;

            // Add type-specific fields
            switch (createForm.type) {
                case 'video':
                    (materialData as any).file_path = createForm.file_path || '';
                    (materialData as any).duration = createForm.duration || 0;
                    break;
                case 'live_session':
                    (materialData as any).meet_link = createForm.meet_link || '';
                    (materialData as any).scheduled_at = createForm.scheduled_at || '';
                    break;
                case 'external_link':
                    (materialData as any).external_url = createForm.external_url || '';
                    break;
                case 'document':
                    (materialData as any).file_path = '';
                    break;
            }

            const success = await createMaterial(materialData, documentFile || undefined);

            if (success) {
                toast.success('Material created successfully');
                setCreateModalOpen(false);
                resetCreateForm();
                setValidationErrors({});
                fetchMaterials();
            } else {
                toast.error('Failed to create material');
            }
        } catch (error) {
            console.error('Error creating material:', error);
            toast.error('An error occurred while creating material');
        }
    };

    const handleEditMaterial = async () => {
        if (!selectedMaterial) return;

        // Validate form
        const errors = validateForm(editForm);
        setValidationErrors(errors);

        if (Object.keys(errors).length > 0) {
            toast.error('Please fix the validation errors');
            return;
        }

        try {
            const materialData: MaterialArgs = {
                module_id: selectedMaterial.module_id,
                title: editForm.title,
                type: editForm.type,
                content: editForm.content,
                order_index: editForm.order_index,
                is_active: editForm.is_active,
            } as MaterialArgs;

            // Add type-specific fields
            switch (editForm.type) {
                case 'video':
                    (materialData as any).file_path = editForm.file_path || selectedMaterial.file_path || '';
                    (materialData as any).duration = editForm.duration || selectedMaterial.duration || 0;
                    break;
                case 'live_session':
                    (materialData as any).meet_link = editForm.meet_link || selectedMaterial.meet_link || '';
                    (materialData as any).scheduled_at = editForm.scheduled_at || selectedMaterial.scheduled_at || '';
                    break;
                case 'external_link':
                    (materialData as any).external_url = editForm.external_url || selectedMaterial.external_url || '';
                    break;
                case 'document':
                    (materialData as any).file_path = selectedMaterial.file_path || '';
                    break;
            }

            const success = await updateMaterial(materialData, selectedMaterial.id);

            if (success) {
                toast.success('Material updated successfully');
                setEditModalOpen(false);
                setSelectedMaterial(null);
                setValidationErrors({});
                fetchMaterials();
            } else {
                toast.error('Failed to update material');
            }
        } catch (error) {
            console.error('Error updating material:', error);
            toast.error('An error occurred while updating material');
        }
    };

    const handleDeleteMaterial = async (materialId: string, title: string) => {
        if (!confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
            return;
        }

        try {
            const success = await deleteMaterial(materialId);

            if (success) {
                toast.success('Material deleted successfully');
                fetchMaterials();
            } else {
                toast.error('Failed to delete material');
            }
        } catch (error) {
            console.error('Error deleting material:', error);
            toast.error('An error occurred while deleting material');
        }
    };

    const openEditModal = (material: OneMaterial) => {
        setSelectedMaterial(material);
        setEditForm({
            title: material.title,
            type: material.type as MaterialType,
            content: material.content || '',
            order_index: material.order_index,
            is_active: material.is_active,
            file_path: material.file_path || '',
            duration: material.duration || 0,
            meet_link: material.meet_link || '',
            scheduled_at: material.scheduled_at || '',
            external_url: material.external_url || '',
        });
        setValidationErrors({}); // Clear validation errors
        setEditModalOpen(true);
    };

    const resetCreateForm = () => {
        setCreateForm({
            title: '',
            type: 'video',
            content: '',
            order_index: materials.length + 1,
            is_active: true,
        });
        setDocumentFile(null);
        setValidationErrors({});
    };

    const getMaterialIcon = (type: string) => {
        switch (type) {
            case 'video':
                return <Video className="h-4 w-4" />;
            case 'live_session':
                return <Calendar className="h-4 w-4" />;
            case 'external_link':
                return <Link className="h-4 w-4" />;
            case 'document':
                return <FileText className="h-4 w-4" />;
            case 'quiz':
                return <FileQuestion className="h-4 w-4" />;
            default:
                return <FileText className="h-4 w-4" />;
        }
    };

    const formatMaterialType = (type: string) => {
        switch (type) {
            case 'video':
                return 'Video';
            case 'live_session':
                return 'Live Session';
            case 'external_link':
                return 'External Link';
            case 'document':
                return 'Document';
            case 'quiz':
                return 'Quiz';
            default:
                return type;
        }
    };

    const renderTypeSpecificFields = (form: CreateMaterialForm, setForm: (form: CreateMaterialForm) => void, isEdit = false) => {
        switch (form.type) {
            case 'video':
                return (
                    <>
                        <div>
                            <Label htmlFor="file_path">Video URL/Path</Label>
                            <Input
                                id="file_path"
                                type="url"
                                value={form.file_path || ''}
                                onChange={(e) => setForm({ ...form, file_path: e.target.value })}
                                placeholder="https://youtube.com/watch?v=xxx or https://example.com/video.mp4"
                                className={`mt-1 ${validationErrors.file_path ? 'border-red-500' : ''}`}
                            />
                            {validationErrors.file_path && (
                                <p className="text-red-500 text-sm mt-1">{validationErrors.file_path}</p>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="duration">Duration (minutes)</Label>
                            <Input
                                id="duration"
                                type="number"
                                min="0"
                                value={form.duration || ''}
                                onChange={(e) => setForm({ ...form, duration: parseInt(e.target.value) || 0 })}
                                placeholder="0"
                                className="mt-1"
                            />
                        </div>
                    </>
                );
            case 'live_session':
                return (
                    <>
                        <div>
                            <Label htmlFor="meet_link">Meet Link</Label>
                            <Input
                                id="meet_link"
                                type="url"
                                value={form.meet_link || ''}
                                onChange={(e) => setForm({ ...form, meet_link: e.target.value })}
                                placeholder="https://meet.google.com/xxx-xxxx-xxx or https://zoom.us/j/xxx"
                                className={`mt-1 ${validationErrors.meet_link ? 'border-red-500' : ''}`}
                            />
                            {validationErrors.meet_link && (
                                <p className="text-red-500 text-sm mt-1">{validationErrors.meet_link}</p>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="scheduled_at">Scheduled Date & Time</Label>
                            <Input
                                id="scheduled_at"
                                type="datetime-local"
                                value={form.scheduled_at || ''}
                                onChange={(e) => setForm({ ...form, scheduled_at: e.target.value })}
                                className="mt-1"
                            />
                        </div>
                    </>
                );
            case 'external_link':
                return (
                    <div>
                        <Label htmlFor="external_url">External URL</Label>
                        <Input
                            id="external_url"
                            type="url"
                            value={form.external_url || ''}
                            onChange={(e) => setForm({ ...form, external_url: e.target.value })}
                            placeholder="https://example.com"
                            className={`mt-1 ${validationErrors.external_url ? 'border-red-500' : ''}`}
                        />
                        {validationErrors.external_url && (
                            <p className="text-red-500 text-sm mt-1">{validationErrors.external_url}</p>
                        )}
                    </div>
                );
            case 'document':
                return (
                    <div>
                        <Label htmlFor="document">Document File {!isEdit && <span className="text-red-500">*</span>}</Label>
                        <Input
                            id="document"
                            type="file"
                            accept=".pdf,.doc,.docx,.txt,.ppt,.pptx"
                            onChange={(e) => setDocumentFile(e.target.files?.[0] || null)}
                            className="mt-1"
                        />
                        {isEdit && <p className="text-sm text-gray-500 mt-1">Leave empty to keep current document</p>}
                    </div>
                );
            case 'quiz':
                return (
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                            <FileQuestion className="h-5 w-5 text-blue-600" />
                            <span className="font-medium text-blue-800">Quiz Configuration</span>
                        </div>
                        <p className="text-sm text-blue-700">
                            After creating this quiz material, use the "Manage Questions" button to add quiz questions and answers.
                        </p>
                    </div>
                );
            default:
                return null;
        }
    };

    const handleViewMaterial = (material: OneMaterial) => {
        let url = '';

        switch (material.type) {
            case 'video':
                url = material.file_path;
                break;
            case 'live_session':
                url = material.meet_link || '';
                break;
            case 'external_link':
                url = material.external_url || '';
                break;
            case 'document':
                url = material.file_path;
                break;
            default:
                toast.error('Unable to view this material type');
                return;
        }

        if (url) {
            window.open(url, '_blank', 'noopener,noreferrer');
        } else {
            toast.error('No URL available for this material');
        }
    };

    const canViewMaterial = (material: OneMaterial) => {
        switch (material.type) {
            case 'video':
                return !!material.file_path;
            case 'live_session':
                return !!material.meet_link;
            case 'external_link':
                return !!material.external_url;
            case 'document':
                return !!material.file_path;
            case 'quiz':
                return false; // Quiz materials don't have viewable URLs
            default:
                return false;
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <Toaster position="top-right" />

            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center gap-4 mb-4">
                    <Button
                        onClick={() => router.back()}
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Materials</h1>
                        {moduleTitle && (
                            <p className="text-gray-600">Module: {decodeURIComponent(moduleTitle)}</p>
                        )}
                    </div>
                </div>

                <div className="flex justify-between items-center">
                    <p className="text-gray-600">
                        {materials.length} {materials.length === 1 ? 'material' : 'materials'}
                    </p>
                    <Button
                        onClick={() => {
                            resetCreateForm();
                            setCreateModalOpen(true);
                        }}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2"
                    >
                        <Plus className="h-4 w-4" />
                        Add Material
                    </Button>
                </div>
            </div>

            {/* Materials List */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                {materials.length === 0 ? (
                    <div className="text-center py-12">
                        <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No materials yet</h3>
                        <p className="text-gray-500 mb-4">Get started by creating your first material</p>
                        <Button
                            onClick={() => {
                                resetCreateForm();
                                setCreateModalOpen(true);
                            }}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white"
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Material
                        </Button>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Order
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Material
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Type
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        View
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {materials.map((material) => (
                                    <tr key={material.id} className={`hover:bg-gray-50 ${!material.is_active ? 'opacity-60 bg-gray-25' : ''}`}>
                                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${!material.is_active ? 'text-gray-500' : 'text-gray-900'}`}>
                                            {material.order_index}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div>
                                                <div className={`text-sm font-medium ${!material.is_active ? 'text-gray-500' : 'text-gray-900'}`}>
                                                    {material.title}
                                                </div>
                                                {material.content && (
                                                    <div className={`text-sm truncate max-w-xs ${!material.is_active ? 'text-gray-400' : 'text-gray-500'}`}>
                                                        {material.content}
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className={`flex items-center gap-2 ${!material.is_active ? 'text-gray-400' : 'text-gray-900'}`}>
                                                {getMaterialIcon(material.type)}
                                                <span className="text-sm">
                                                    {formatMaterialType(material.type)}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${material.is_active
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                                }`}>
                                                {material.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {canViewMaterial(material) && (
                                                <Button
                                                    onClick={() => handleViewMaterial(material)}
                                                    variant="outline"
                                                    size="sm"
                                                    className={`text-blue-600 border-blue-600 hover:bg-blue-50 ${!material.is_active ? 'opacity-50' : ''}`}
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex items-center gap-2">
                                                {material.type === 'quiz' && (
                                                    <Button
                                                        onClick={() => handleManageQuestions(material)}
                                                        variant="outline"
                                                        size="sm"
                                                        className={`text-purple-600 border-purple-600 hover:bg-purple-50 ${!material.is_active ? 'opacity-50' : ''}`}
                                                        title="Manage Questions"
                                                    >
                                                        <FileQuestion className="h-4 w-4" />
                                                    </Button>
                                                )}
                                                <Button
                                                    onClick={() => openEditModal(material)}
                                                    variant="outline"
                                                    size="sm"
                                                    className={`text-indigo-600 border-indigo-600 hover:bg-indigo-50 ${!material.is_active ? 'opacity-50' : ''}`}
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    onClick={() => handleDeleteMaterial(material.id, material.title)}
                                                    variant="outline"
                                                    size="sm"
                                                    className={`text-red-600 border-red-600 hover:bg-red-50 ${!material.is_active ? 'opacity-50' : ''}`}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Create Material Modal */}
            <Modal
                isOpen={createModalOpen}
                onClose={() => {
                    setCreateModalOpen(false);
                    setValidationErrors({});
                }}
                title="Add New Material"
                className="max-w-2xl overflow-y-auto"
            >
                <div className="space-y-6">
                    <div>
                        <Label htmlFor="title">Title <span className="text-red-500">*</span></Label>
                        <Input
                            id="title"
                            value={createForm.title}
                            onChange={(e) => setCreateForm({ ...createForm, title: e.target.value })}
                            placeholder="Enter material title"
                            className={`mt-1 ${validationErrors.title ? 'border-red-500' : ''}`}
                        />
                        {validationErrors.title && (
                            <p className="text-red-500 text-sm mt-1">{validationErrors.title}</p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="type">Material Type <span className="text-red-500">*</span></Label>
                        <select
                            id="type"
                            value={createForm.type}
                            onChange={(e) => {
                                setCreateForm({ ...createForm, type: e.target.value as MaterialType });
                                setValidationErrors({}); // Clear validation errors when type changes
                            }}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                        >
                            <option value="video">Video</option>
                            <option value="live_session">Live Session</option>
                            <option value="external_link">External Link</option>
                            <option value="document">Document</option>
                            <option value="quiz">Quiz</option>
                        </select>
                    </div>

                    <div>
                        <Label htmlFor="content">Description</Label>
                        <Textarea
                            id="content"
                            value={createForm.content}
                            onChange={(e) => setCreateForm({ ...createForm, content: e.target.value })}
                            placeholder="Enter material description"
                            className="mt-1"
                            rows={3}
                        />
                    </div>

                    {renderTypeSpecificFields(createForm, setCreateForm)}

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="order_index">Order Index</Label>
                            <Input
                                id="order_index"
                                type="number"
                                min="1"
                                value={createForm.order_index}
                                onChange={(e) => setCreateForm({ ...createForm, order_index: parseInt(e.target.value) || 1 })}
                                className="mt-1"
                            />
                        </div>
                        <div className="flex items-center">
                            <input
                                id="is_active"
                                type="checkbox"
                                checked={createForm.is_active}
                                onChange={(e) => setCreateForm({ ...createForm, is_active: e.target.checked })}
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <Label htmlFor="is_active" className="ml-2">Active</Label>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 pt-6 border-t">
                        <Button
                            onClick={() => {
                                setCreateModalOpen(false);
                                setValidationErrors({});
                            }}
                            variant="outline"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleCreateMaterial}
                            disabled={!createForm.title.trim()}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-50"
                        >
                            Create Material
                        </Button>
                    </div>
                </div>
            </Modal>

            {/* Edit Material Modal */}
            <Modal
                isOpen={editModalOpen}
                onClose={() => {
                    setEditModalOpen(false);
                    setValidationErrors({});
                }}
                title="Edit Material"
                className="max-w-2xl"
            >
                <div className="space-y-6">
                    <div>
                        <Label htmlFor="edit_title">Title <span className="text-red-500">*</span></Label>
                        <Input
                            id="edit_title"
                            value={editForm.title}
                            onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                            placeholder="Enter material title"
                            className={`mt-1 ${validationErrors.title ? 'border-red-500' : ''}`}
                        />
                        {validationErrors.title && (
                            <p className="text-red-500 text-sm mt-1">{validationErrors.title}</p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="edit_content">Description</Label>
                        <Textarea
                            id="edit_content"
                            value={editForm.content}
                            onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                            placeholder="Enter material description"
                            className="mt-1"
                            rows={3}
                        />
                    </div>

                    {renderTypeSpecificFields(editForm, setEditForm, true)}

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="edit_order_index">Order Index</Label>
                            <Input
                                id="edit_order_index"
                                type="number"
                                min="1"
                                value={editForm.order_index}
                                onChange={(e) => setEditForm({ ...editForm, order_index: parseInt(e.target.value) || 1 })}
                                className="mt-1"
                            />
                        </div>
                        <div className="flex items-center">
                            <input
                                id="edit_is_active"
                                type="checkbox"
                                checked={editForm.is_active}
                                onChange={(e) => setEditForm({ ...editForm, is_active: e.target.checked })}
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <Label htmlFor="edit_is_active" className="ml-2">Active</Label>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 pt-6 border-t">
                        <Button
                            onClick={() => {
                                setEditModalOpen(false);
                                setValidationErrors({});
                            }}
                            variant="outline"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleEditMaterial}
                            disabled={!editForm.title.trim()}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-50"
                        >
                            Update Material
                        </Button>
                    </div>
                </div>
            </Modal>

            {/* Quiz Questions Management Modal */}
            <Modal
                isOpen={quizQuestionsModalOpen}
                onClose={() => setQuizQuestionsModalOpen(false)}
                title={`Manage Quiz Questions - ${selectedMaterial?.title}`}
                className="max-w-4xl max-h-[90vh] overflow-y-auto"
            >
                <div className="space-y-6">
                    {/* Add New Question Form */}
                    <div className="bg-gray-50 p-6 rounded-lg border">
                        <h3 className="text-lg font-semibold mb-4">Add New Question</h3>

                        <div className="space-y-4">
                            {/* Question Input */}
                            <div>
                                <Label htmlFor="new_question">Question <span className="text-red-500">*</span></Label>
                                <Textarea
                                    id="new_question"
                                    value={newQuestion.question}
                                    onChange={(e) => setNewQuestion(prev => ({ ...prev, question: e.target.value }))}
                                    placeholder="Enter your question here..."
                                    className="mt-1"
                                    rows={3}
                                />
                            </div>

                            {/* Answer Mode Toggle */}
                            <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                <div>
                                    <Label className="font-medium text-blue-800">Answer Mode</Label>
                                    <p className="text-xs text-blue-600 mt-1">
                                        {newQuestion.allowMultipleCorrect
                                            ? 'Multiple correct answers allowed'
                                            : 'Only one correct answer allowed'
                                        }
                                    </p>
                                </div>
                                <Button
                                    type="button"
                                    onClick={toggleAnswerMode}
                                    variant="outline"
                                    size="sm"
                                    className="text-blue-600 border-blue-600 hover:bg-blue-100"
                                >
                                    {newQuestion.allowMultipleCorrect ? 'Switch to Single' : 'Switch to Multiple'}
                                </Button>
                            </div>

                            {/* Options */}
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <Label>Answer Options <span className="text-red-500">*</span></Label>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-gray-500">
                                            {newQuestion.options.length} options
                                        </span>
                                        <Button
                                            type="button"
                                            onClick={removeOption}
                                            disabled={newQuestion.options.length <= 2}
                                            variant="outline"
                                            size="sm"
                                            className="text-red-600 border-red-600 hover:bg-red-50 disabled:opacity-50"
                                        >
                                            Remove
                                        </Button>
                                        <Button
                                            type="button"
                                            onClick={addOption}
                                            disabled={newQuestion.options.length >= 6}
                                            variant="outline"
                                            size="sm"
                                            className="text-green-600 border-green-600 hover:bg-green-50 disabled:opacity-50"
                                        >
                                            Add Option
                                        </Button>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    {newQuestion.options.map((option, index) => (
                                        <div key={option.id} className="flex items-center gap-3 p-3 border rounded-lg bg-white">
                                            <span className="font-medium text-sm text-gray-600 min-w-[20px]">
                                                {String.fromCharCode(65 + index)}.
                                            </span>
                                            <Input
                                                value={option.text}
                                                onChange={(e) => updateQuestionOption(option.id, 'text', e.target.value)}
                                                placeholder={`Option ${String.fromCharCode(65 + index)}`}
                                                className="flex-1"
                                            />
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type={newQuestion.allowMultipleCorrect ? "checkbox" : "radio"}
                                                    name={newQuestion.allowMultipleCorrect ? undefined : "correct_answer"}
                                                    checked={option.isCorrect}
                                                    onChange={(e) => updateQuestionOption(option.id, 'isCorrect', e.target.checked)}
                                                    className="h-4 w-4 text-green-600"
                                                />
                                                <Label className="text-sm text-green-600">Correct</Label>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-xs text-gray-500 mt-2">
                                    {newQuestion.allowMultipleCorrect
                                        ? 'Check all correct answers'
                                        : 'Select the radio button next to the correct answer'
                                    }
                                </p>
                            </div>

                            {/* Explanation */}
                            <div>
                                <Label htmlFor="explanation">Explanation (Optional)</Label>
                                <Textarea
                                    id="explanation"
                                    value={newQuestion.explanation}
                                    onChange={(e) => setNewQuestion(prev => ({ ...prev, explanation: e.target.value }))}
                                    placeholder="Provide an explanation for the correct answer..."
                                    className="mt-1"
                                    rows={2}
                                />
                            </div>

                            {/* Add Question Button */}
                            <div className="flex justify-end">
                                <Button
                                    onClick={handleAddQuestion}
                                    className="bg-green-600 hover:bg-green-700 text-white"
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Question
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Existing Questions List */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">
                            Existing Questions ({quizQuestions.length})
                        </h3>

                        {quizQuestions.length === 0 ? (
                            <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
                                <FileQuestion className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                                <p>No questions added yet</p>
                                <p className="text-sm">Add your first question using the form above</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {quizQuestions.map((question, questionIndex) => (
                                    <div key={question.id} className="border rounded-lg p-6 bg-white">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h4 className="font-medium text-gray-900">
                                                    Question {questionIndex + 1}
                                                </h4>
                                                <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full mt-2 ${question.allowMultipleCorrect
                                                    ? 'bg-purple-100 text-purple-800'
                                                    : 'bg-blue-100 text-blue-800'
                                                    }`}>
                                                    {question.allowMultipleCorrect ? 'Multiple Choice' : 'Single Choice'}
                                                </span>
                                            </div>
                                            <Button
                                                onClick={() => handleDeleteQuestion(question.id)}
                                                variant="outline"
                                                size="sm"
                                                className="text-red-600 border-red-600 hover:bg-red-50"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>

                                        <div className="mb-4">
                                            <p className="text-gray-800 font-medium">{question.question}</p>
                                        </div>

                                        <div className="space-y-2 mb-4">
                                            {question.options.map((option, optionIndex) => (
                                                <div
                                                    key={option.id}
                                                    className={`flex items-center gap-3 p-3 rounded-lg border ${option.isCorrect
                                                        ? 'bg-green-50 border-green-200'
                                                        : 'bg-gray-50 border-gray-200'
                                                        }`}
                                                >
                                                    <span className="font-medium text-sm text-gray-600 min-w-[20px]">
                                                        {String.fromCharCode(65 + optionIndex)}.
                                                    </span>
                                                    <span className="flex-1">{option.text}</span>
                                                    <div className="flex items-center gap-2">
                                                        {/* Show the type of input this would be */}
                                                        <div className={`w-4 h-4 border-2 flex items-center justify-center ${question.allowMultipleCorrect ? 'rounded' : 'rounded-full'
                                                            } ${option.isCorrect
                                                                ? 'border-green-600 bg-green-600'
                                                                : 'border-gray-400'
                                                            }`}>
                                                            {option.isCorrect && (
                                                                <span className="text-white text-xs">
                                                                    {question.allowMultipleCorrect ? '✓' : '●'}
                                                                </span>
                                                            )}
                                                        </div>
                                                        {option.isCorrect && (
                                                            <span className="text-green-600 text-sm font-medium">Correct</span>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {question.explanation && (
                                            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                                <p className="text-sm text-blue-800">
                                                    <span className="font-medium">Explanation: </span>
                                                    {question.explanation}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Modal Actions */}
                    <div className="flex justify-end gap-4 pt-6 border-t">
                        <Button
                            onClick={() => setQuizQuestionsModalOpen(false)}
                            variant="outline"
                        >
                            Close
                        </Button>
                        <Button
                            onClick={() => {
                                toast.success(`Quiz saved with ${quizQuestions.length} questions!`);
                                setQuizQuestionsModalOpen(false);
                            }}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white"
                        >
                            Save Quiz
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default function page() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
        }>
            <MaterialManagementPage />
        </Suspense>
    );
}
