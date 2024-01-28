import { useMemo } from "react";
import { toast, ToastOptions as toastOptions } from "react-hot-toast";

export const useToast = () => {
  return useMemo(
    () => ({
      success: (message, toastOptions) => {
        return toast.success(message, {
          ...toastOptions,
        });
      },
      error: (message, toastOptions) => {
        return toast.error(message, {
          ...toastOptions,
        }); 
      },
      dismiss: () => toast.dismiss(),
    }),
    []
  );
};
