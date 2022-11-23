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
  {
    title: "Popular Video",
    path: Path.popular,
    Icon: PlayIcon,
  },
  {
    title: "Trendy",
    path: Path.trendy,
    Icon: TrendyIcon,
  },
];

export const NotificationMapperContent = {
  [NOTIFICATIONS_TYPES.COMMENT_VIDEO]: "Commented on your video.",
  [NOTIFICATIONS_TYPES.EMOTION_REACT_VIDEO]: "Liked your video.",
};
