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
import { Plus, Edit, Trash2, Video, Link, FileText, Calendar, ArrowLeft, Eye } from "lucide-react";
import { useRouter } from "next/navigation";

type MaterialType = 'video' | 'live_session' | 'external_link' | 'document';

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
                                placeholder="https://example.com/video.mp4"
                                className="mt-1"
                            />
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
                            <Label htmlFor="meet_link">Google Meet Link</Label>
                            <Input
                                id="meet_link"
                                type="url"
                                value={form.meet_link || ''}
                                onChange={(e) => setForm({ ...form, meet_link: e.target.value })}
                                placeholder="https://meet.google.com/xxx-xxxx-xxx"
                                className="mt-1"
                            />
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
                            className="mt-1"
                        />
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
                                    <tr key={material.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {material.order_index}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">
                                                    {material.title}
                                                </div>
                                                {material.content && (
                                                    <div className="text-sm text-gray-500 truncate max-w-xs">
                                                        {material.content}
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                {getMaterialIcon(material.type)}
                                                <span className="text-sm text-gray-900">
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
                                                    className="text-blue-600 border-blue-600 hover:bg-blue-50"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    onClick={() => openEditModal(material)}
                                                    variant="outline"
                                                    size="sm"
                                                    className="text-indigo-600 border-indigo-600 hover:bg-indigo-50"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    onClick={() => handleDeleteMaterial(material.id, material.title)}
                                                    variant="outline"
                                                    size="sm"
                                                    className="text-red-600 border-red-600 hover:bg-red-50"
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
                onClose={() => setCreateModalOpen(false)}
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
                            className="mt-1"
                        />
                    </div>

                    <div>
                        <Label htmlFor="type">Material Type <span className="text-red-500">*</span></Label>
                        <select
                            id="type"
                            value={createForm.type}
                            onChange={(e) => setCreateForm({ ...createForm, type: e.target.value as MaterialType })}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                        >
                            <option value="video">Video</option>
                            <option value="live_session">Live Session</option>
                            <option value="external_link">External Link</option>
                            <option value="document">Document</option>
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
                            onClick={() => setCreateModalOpen(false)}
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
                onClose={() => setEditModalOpen(false)}
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
                            className="mt-1"
                        />
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
                            onClick={() => setEditModalOpen(false)}
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
