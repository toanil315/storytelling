import { Path } from "src/utils/Path";
import HomeIcon from "src/components/icons/HomeIcon";
import PlayIcon from "src/components/icons/PlayIcon";
import TrendyIcon from "src/components/icons/TrendyIcon";
import { RouteItem } from "src/utils/constants";
import { NOTIFICATIONS_TYPES } from "src/utils/constants";

export const getRoutes = (): RouteItem[] => [
  {
    title: "Home Page",
    path: Path.home,
    Icon: HomeIcon,
  },
];

export const NotificationMapperContent = {
  [NOTIFICATIONS_TYPES.COMMENT_VIDEO]: "Commented on your video.",
  [NOTIFICATIONS_TYPES.EMOTION_REACT_VIDEO]: "Liked your video.",
  [NOTIFICATIONS_TYPES.USER_SUBSCRIBE_COURSE]: "Buy your course.",
  [NOTIFICATIONS_TYPES.USER_FOLLOW_INSTRUCTOR]: "Started following you",
};
