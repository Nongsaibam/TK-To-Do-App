import { useNavigate } from 'react-router-dom';
import AppLayout from '../../components/layout/AppLayout';
import PageContainer from '../../components/layout/PageContainer';

const CUSTOM_CATEGORIES_KEY = 'modern-taskflow-custom-categories';

export default function CreateCategoriesPage() {
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get('categoryName')?.trim();
    if (!name) return;

    let categories = [];
    try {
      categories = JSON.parse(localStorage.getItem(CUSTOM_CATEGORIES_KEY)) || [];
    } catch {
      categories = [];
    }

    if (!categories.some((category) => category.toLowerCase() === name.toLowerCase())) {
      localStorage.setItem(CUSTOM_CATEGORIES_KEY, JSON.stringify([...categories, name]));
    }
    navigate(-1);
  }

  return (
    <AppLayout>
      <PageContainer className="pt-2">
        <section className="rounded-[8px] border border-[#e5e7eb] bg-white p-4 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-[#111827] sm:text-[2.05rem]">Create Categories</h1>
              <p className="mt-1 text-sm text-[#6b7280]">Add a category for organizing tasks.</p>
            </div>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="rounded-[6px] border border-[#e5e7eb] px-3 py-2 text-sm font-semibold text-[#374151]"
            >
              Go Back
            </button>
          </div>

          <div className="mt-6">
            <form onSubmit={handleSubmit} className="rounded-[8px] border border-[#e5e7eb] bg-[#f9fafb] p-4 sm:p-6">
              <div className="max-w-[640px]">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-[#111827]">
                    Category Name
                  </span>
                  <input name="categoryName" className="h-11 w-full rounded-[6px] border border-[#d1d5db] bg-white px-3 text-sm outline-none focus:border-[#111827]" />
                </label>

                <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                  <button
                    type="submit"
                    className="h-10 rounded-[6px] bg-[#111827] px-4 text-sm font-semibold text-white"
                  >
                    Create
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="h-10 rounded-[6px] border border-[#e5e7eb] bg-white px-4 text-sm font-semibold text-[#374151]"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </PageContainer>
    </AppLayout>
  );
}
