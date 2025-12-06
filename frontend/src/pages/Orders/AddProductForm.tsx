import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ModalWrapper from "@/components/ModalWrapper";

interface AddProductFormProps {
  onClose: () => void;
}

const AddProductForm = ({ onClose }: AddProductFormProps) => {
  const { t } = useTranslation();

  const schema = z.object({
    title: z.string().min(1, t("addProductForm.validation.titleRequired")),
    type: z.string().min(1, t("addProductForm.validation.typeRequired")),
    priceUSD: z.number().min(1, t("addProductForm.validation.pricePositive")),
  });

  type FormData = z.infer<typeof schema>;

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
        <h5 className="mb-3">{t("addProductForm.title")}</h5>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">
              {t("addProductForm.fields.title")}
            </label>
            <input className="form-control" {...register("title")} />
            {errors.title && (
              <p className="text-danger small">{errors.title.message}</p>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">
              {t("addProductForm.fields.type")}
            </label>
            <input className="form-control" {...register("type")} />
            {errors.type && (
              <p className="text-danger small">{errors.type.message}</p>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">
              {t("addProductForm.fields.priceUSD")}
            </label>
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
              {t("buttons.cancel")}
            </button>
            <button type="submit" className="btn btn-primary">
              {t("buttons.save")}
            </button>
          </div>
        </form>
      </div>
    </ModalWrapper>
  );
};

export default AddProductForm;
