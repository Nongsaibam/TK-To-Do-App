import Button from '../common/Button';
import InputField from '../common/InputField';
import ModalWrapper from '../common/ModalWrapper';

export default function CreateCategoryModal({ isOpen, onClose }) {
  return (
    <ModalWrapper
      title="Create Category"
      description="Group tasks by discipline or workflow."
      isOpen={isOpen}
      onClose={onClose}
    >
      <form className="space-y-4">
        <InputField id="category-name" label="Category Name" placeholder="Planning" />
        <InputField id="category-color" label="Theme" placeholder="Soft coral" />
        <Button className="w-full" onClick={onClose}>
          Create category
        </Button>
      </form>
    </ModalWrapper>
  );
}
