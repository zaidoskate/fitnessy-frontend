import { useState, useEffect, useCallback } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { apiService } from './services/api';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import RecordsSection from './components/RecordsSection';
import CategoriesSidebar from './components/CategoriesSidebar';
import SplitBanner from './components/SplitBanner';
import TopPodium from './components/TopPodium';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import RecordFormModal from './components/RecordFormModal';
import CategoryFormModal from './components/CategoryFormModal';

function DashboardContent() {
  const { user, isAuthenticated, isAdmin } = useAuth();

  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [records, setRecords] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [stats, setStats] = useState({
    total_records_oficiales: 1420,
    total_atletas: 850,
  });
  const [topRecords, setTopRecords] = useState([]);
  const [feedbackError, setFeedbackError] = useState('');

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState('login');
  const [recordModalOpen, setRecordModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const loadRecords = useCallback(
    async (
      categoryId = selectedCategoryId,
      targetPage = page,
      search = searchQuery,
      status = statusFilter
    ) => {
      const esOficialParam =
        status === 'official' ? true : status === 'pending' ? false : null;

      const data = await apiService.getRecords({
        id_categoria: categoryId,
        es_oficial: esOficialParam,
        search,
        page: targetPage,
        limit: 3,
      });
      setRecords(data.records || []);
      setPage(data.page || targetPage);
      setTotalPages(data.totalPages || 1);
    },
    [selectedCategoryId, page, searchQuery, statusFilter]
  );

  const loadGlobalData = useCallback(async () => {
    const [cats, st, top3] = await Promise.all([
      apiService.getCategories(),
      apiService.getStats(),
      apiService.getTop3(),
    ]);
    setCategories(cats);
    setStats(st);
    setTopRecords(top3);
  }, []);

  useEffect(() => {
    loadGlobalData();
  }, [loadGlobalData]);

  useEffect(() => {
    loadRecords(selectedCategoryId, page, searchQuery, statusFilter);
  }, [selectedCategoryId, page, searchQuery, statusFilter, loadRecords]);

  useEffect(() => {
    if (!isAdmin && statusFilter !== 'all') {
      setStatusFilter('all');
    }
  }, [isAdmin, statusFilter]);

  const handleSelectCategory = (catId) => {
    setSelectedCategoryId(catId);
    setPage(1);
  };

  const handleSearchChange = (q) => {
    setSearchQuery(q);
    setPage(1);
  };

  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleOpenUpload = () => {
    if (!isAuthenticated) {
      setAuthModalTab('login');
      setAuthModalOpen(true);
      return;
    }
    setEditingRecord(null);
    setRecordModalOpen(true);
  };

  const handleEditRecord = (record) => {
    setEditingRecord(record);
    setRecordModalOpen(true);
  };

  const handleSaveRecord = async (payload) => {
    if (editingRecord) {
      await apiService.updateRecord(editingRecord.id_record, payload);
    } else {
      await apiService.createRecord(payload);
    }
    await Promise.all([
      loadRecords(selectedCategoryId, page, searchQuery, statusFilter),
      loadGlobalData(),
    ]);
  };

  const handleDeleteRecord = async (idRecord) => {
    setFeedbackError('');
    try {
      await apiService.deleteRecord(idRecord);
      await Promise.all([
        loadRecords(selectedCategoryId, page, searchQuery, statusFilter),
        loadGlobalData(),
      ]);
    } catch (err) {
      setFeedbackError(err.message || 'No se pudo eliminar el récord.');
    }
  };

  const handleToggleOfficial = async (record) => {
    setFeedbackError('');
    try {
      await apiService.updateRecordStatus(record.id_record, !record.es_oficial);
      await Promise.all([
        loadRecords(selectedCategoryId, page, searchQuery, statusFilter),
        loadGlobalData(),
      ]);
    } catch (err) {
      setFeedbackError(err.message || 'No se pudo cambiar el estatus del récord.');
    }
  };

  const handleOpenNewCategory = () => {
    setEditingCategory(null);
    setCategoryModalOpen(true);
  };

  const handleEditCategory = (cat) => {
    setEditingCategory(cat);
    setCategoryModalOpen(true);
  };

  const handleSaveCategory = async (payload) => {
    if (editingCategory) {
      await apiService.updateCategory(editingCategory.id_categoria, payload);
    } else {
      await apiService.createCategory(payload);
    }
    const cats = await apiService.getCategories();
    setCategories(cats);
  };

  const handleDeleteCategory = async (idCategoria) => {
    setFeedbackError('');
    try {
      await apiService.deleteCategory(idCategoria);
      if (Number(selectedCategoryId) === Number(idCategoria)) {
        setSelectedCategoryId(null);
      }
      const cats = await apiService.getCategories();
      setCategories(cats);
    } catch (err) {
      setFeedbackError(
        err.message || 'No se puede eliminar una categoría con récords asociados.'
      );
    }
  };

  const handleNavigate = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const selectedCategoryObj = categories.find(
    (c) => Number(c.id_categoria) === Number(selectedCategoryId)
  );

  return (
    <div className="bg-surface font-body-md text-on-surface antialiased min-h-screen flex flex-col">
      <Navbar
        onOpenAuth={(tab) => {
          setAuthModalTab(tab || 'login');
          setAuthModalOpen(true);
        }}
        onNavigate={handleNavigate}
      />

      <main className="w-full pt-16 bg-surface min-h-[calc(100vh-80px)] flex-1">
        <div className="flex flex-col w-full bg-surface-variant font-body-md text-on-surface">
          <HeroBanner
            isAdmin={isAdmin}
            isAuthenticated={isAuthenticated}
            onUploadClick={handleOpenUpload}
            onOpenNewCategory={handleOpenNewCategory}
            onFilterPending={() => {
              handleStatusFilterChange('pending');
              handleNavigate('records');
            }}
          />

          <section className="w-full max-w-[1440px] mx-auto px-margin md:px-margin-desktop py-space-xl">
            {feedbackError && (
              <div className="mb-space-md p-space-sm bg-primary-container text-tertiary-fixed font-label-md text-label-md flex items-center justify-between rounded-DEFAULT">
                <span>{feedbackError}</span>
                <button
                  type="button"
                  onClick={() => setFeedbackError('')}
                  className="font-bold px-space-sm"
                >
                  [×]
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-start">
              <RecordsSection
                records={records}
                page={page}
                totalPages={totalPages}
                selectedCategoryName={selectedCategoryObj?.nombre || null}
                onClearCategory={() => handleSelectCategory(null)}
                onPageChange={handlePageChange}
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
                statusFilter={statusFilter}
                onStatusFilterChange={handleStatusFilterChange}
                user={user}
                isAdmin={isAdmin}
                onEditRecord={handleEditRecord}
                onDeleteRecord={handleDeleteRecord}
                onToggleOfficial={handleToggleOfficial}
              />

              <CategoriesSidebar
                categories={categories}
                selectedCategoryId={selectedCategoryId}
                onSelectCategory={handleSelectCategory}
                isAdmin={isAdmin}
                onOpenNewCategory={handleOpenNewCategory}
                onEditCategory={handleEditCategory}
                onDeleteCategory={handleDeleteCategory}
              />
            </div>
          </section>

          <SplitBanner stats={stats} />

          <TopPodium topRecords={topRecords} />
        </div>
      </main>

      <Footer />

      <AuthModal
        isOpen={authModalOpen}
        initialTab={authModalTab}
        onClose={() => setAuthModalOpen(false)}
      />

      <RecordFormModal
        isOpen={recordModalOpen}
        onClose={() => setRecordModalOpen(false)}
        categories={categories}
        initialRecord={editingRecord}
        onSave={handleSaveRecord}
      />

      <CategoryFormModal
        isOpen={categoryModalOpen}
        onClose={() => setCategoryModalOpen(false)}
        initialCategory={editingCategory}
        onSave={handleSaveCategory}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <DashboardContent />
    </AuthProvider>
  );
}
