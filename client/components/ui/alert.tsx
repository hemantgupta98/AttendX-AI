import { AlertTriangle } from "lucide-react";

export default function AiServiceNotice() {
  return (
    <div className="mb-6 rounded-xl border border-amber-300 bg-amber-50 p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <AlertTriangle className="mt-0.5 h-6 w-6 flex-shrink-0 text-amber-600" />

        <div>
          <h3 className="text-base font-semibold text-amber-800">
            AI Service Notice
          </h3>

          <p className="mt-1 text-sm leading-6 text-amber-700">
            If this is your first attendance attempt after a period of
            inactivity, our AI server may take{" "}
            <span className="font-semibold">30–90 seconds</span> to wake up.
          </p>

          <p className="mt-2 text-sm leading-6 text-amber-700">
            If face verification fails or you receive a{" "}
            <span className="font-semibold">502 Server Error</span>, please wait
            for about <span className="font-semibold">30–90 seconds</span>,
            capture your image again, and resubmit your attendance.
          </p>
        </div>
      </div>
    </div>
  );
}
