"use client";

import { useEffect } from "react";
import Swal from "sweetalert2";

interface AlertMessageProps {
  type: "success" | "error" | "warning" | "info" | "question";
  title: string;
  text: string;
  showConfirmButton?: boolean;
  timer?: number;
}

export default function AlertMessage({
  type,
  title,
  text,
  showConfirmButton = true,
  timer,
}: AlertMessageProps) {
  useEffect(() => {
    Swal.fire({
      icon: type,
      title,
      text,
      showConfirmButton,
      timer,
      timerProgressBar: timer ? true : false,
    });
  }, [type, title, text, showConfirmButton, timer]);

  return null;
}