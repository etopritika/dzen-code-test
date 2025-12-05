import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ModalWrapper from "@/components/ModalWrapper";

interface AddProductFormProps {
  onClose: () => void;
}

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  type: z.string().min(1, "Type is required"),
  priceUSD: z.number().min(1, "USD price must be positive"),
});

type FormData = z.infer<typeof schema>;

const AddProductForm = ({ onClose }: AddProductFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log("Submitted:", data);
    onClose();
  };

  return (
    <ModalWrapper onClose={onClose}>
      <div style={{ minWidth: "400px" }}>
        <h5 className="mb-3">Add Product</h5>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input className="form-control" {...register("title")} />
            {errors.title && (
              <p className="text-danger small">{errors.title.message}</p>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Type</label>
            <input className="form-control" {...register("type")} />
            {errors.type && (
              <p className="text-danger small">{errors.type.message}</p>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Price (USD)</label>
            <input
              type="number"
              step="0.01"
              className="form-control"
              {...register("priceUSD", { valueAsNumber: true })}
            />
            {errors.priceUSD && (
              <p className="text-danger small">{errors.priceUSD.message}</p>
            )}
          </div>

          <div className="d-flex justify-content-end gap-2">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </form>
      </div>
    </ModalWrapper>
  );
};

export default AddProductForm;
