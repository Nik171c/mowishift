import { Bell, MessageCircle, ArrowRight } from "lucide-react";

type Message = {
  id: number;
  name: string;
  department: string;
  message: string;
  time: string;
  unread: boolean;
};

const messages: Message[] = [
  {
    id: 1,
    name: "Anders Olsen",
    department: "Produksjon",
    message: "Kan du ta skiftet mitt på fredag?",
    time: "5 min sidan",
    unread: true,
  },
  {
    id: 2,
    name: "Maria Hansen",
    department: "Pakking",
    message: "Eg har sendt ny turnusplan.",
    time: "18 min sidan",
    unread: true,
  },
  {
    id: 3,
    name: "Jonas Berg",
    department: "Lager",
    message: "Takk for hjelpa i dag!",
    time: "1 time sidan",
    unread: false,
  },
];

export function DashboardMessages() {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Nye meldingar
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Siste meldingar frå medarbeidarar
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50">
          <Bell className="h-5 w-5 text-violet-600" />
        </div>
      </div>

      <div className="divide-y divide-slate-100">
        {messages.map((message) => (
          <div
            key={message.id}
            className="flex items-center justify-between px-6 py-5 transition-colors hover:bg-slate-50"
          >
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-100 text-lg font-semibold text-violet-700">
                  {message.name.charAt(0)}
                </div>

                {message.unread && (
                  <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-red-500 ring-2 ring-white" />
                )}
              </div>

              <div>
                <h3 className="font-semibold text-slate-900">{message.name}</h3>

                <p className="text-sm text-slate-500">{message.department}</p>

                <p className="mt-1 text-sm text-slate-400">{message.message}</p>

                <p className="mt-1 text-xs text-slate-400">{message.time}</p>
              </div>
            </div>

            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 transition hover:bg-violet-600 hover:text-white"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-100 px-6 py-4">
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 font-medium text-slate-700 transition hover:border-violet-600 hover:bg-violet-50 hover:text-violet-700"
        >
          <MessageCircle className="h-4 w-4" />
          Sjå alle meldingar
        </button>
      </div>
    </section>
  );
}
