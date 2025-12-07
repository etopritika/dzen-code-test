import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const schema = z.object({
    email: z
      .string()
      .min(1, t("login.validation.emailRequired"))
      .email(t("login.validation.emailInvalid")),
  });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = useCallback(() => {
    const timestamp = Date.now();
    const token = `jwt_${timestamp}`;
    localStorage.setItem("token", token);
    navigate("/orders");
  }, [navigate]);

  return (
    <section
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="card" style={{ width: "100%", maxWidth: "400px" }}>
        <div className="card-body p-4">
          <h2 className="card-title mb-4 text-center">{t("login.title")}</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label className="form-label">{t("login.fields.email")}</label>
              <input
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                {...register("email")}
                placeholder={t("login.fields.email")}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email.message}</div>
              )}
            </div>
            <button type="submit" className="btn btn-primary w-100">
              {t("login.submit")}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
