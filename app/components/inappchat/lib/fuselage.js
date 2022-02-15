import dynamic from "next/dynamic";

export const TextInput = dynamic(
  () => import("@rocket.chat/fuselage").then((comp) => comp.TextInput),
  { ssr: false }
);

export const Icon = dynamic(
  () => import("@rocket.chat/fuselage").then((comp) => comp.Icon),
  { ssr: false }
);

export const Box = dynamic(
  () => import("@rocket.chat/fuselage").then((comp) => comp.Box),
  { ssr: false }
);

export const Message = dynamic(
  () => import("@rocket.chat/fuselage").then((comp) => comp.Message),
  { ssr: false }
);

export const MessageContainer = dynamic(
  () => import("@rocket.chat/fuselage").then((comp) => comp.MessageContainer),
  { ssr: false }
);

export const MessageHeader = dynamic(
  () => import("@rocket.chat/fuselage").then((comp) => comp.MessageHeader),
  { ssr: false }
);

export const MessageName = dynamic(
  () => import("@rocket.chat/fuselage").then((comp) => comp.MessageName),
  { ssr: false }
);

export const MessageUsername = dynamic(
  () => import("@rocket.chat/fuselage").then((comp) => comp.MessageUsername),
  { ssr: false }
);

export const MessageTimestamp = dynamic(
  () => import("@rocket.chat/fuselage").then((comp) => comp.MessageTimestamp),
  { ssr: false }
);

export const MessageBody = dynamic(
  () => import("@rocket.chat/fuselage").then((comp) => comp.MessageBody),
  { ssr: false }
);

export const MessageToolbox = dynamic(
  () =>
    import("@rocket.chat/fuselage").then(
      ({ MessageToolbox }) => MessageToolbox
    ),
  { ssr: false }
);

export const MessageToolboxWrapper = dynamic(
  () =>
    import("@rocket.chat/fuselage").then((comp) => comp.MessageToolboxWrapper),
  { ssr: false }
);

export const MessageToolboxItem = dynamic(
  () => import("@rocket.chat/fuselage").then((comp) => comp.MessageToolboxItem),
  { ssr: false }
);
