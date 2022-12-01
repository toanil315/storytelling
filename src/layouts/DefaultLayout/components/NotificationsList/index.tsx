import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Box from "src/components/commons/Box";
import useGetNotification from "src/hooks/apis/User/useGetNotifications";
import { NotificationMapperContent } from "../../constants";
import DateTimeUtils from "src/utils/DateTimeUtils";
import InfiniteScroll from "react-infinite-scroller";
import { Skeleton } from "antd";
import {
  useAccessCourseByLectureId,
  useGetUserByIdParallel,
  useMarkReadNotification,
  useUser,
} from "src/hooks/apis";
import Text from "src/components/commons/Typography";
import { StyledMenu } from "src/components/commons/Menu/styles";
import { UserType } from "src/data-model/UserTypes";
import ImageComponent from "src/components/commons/Image";
import { DEFAULT_PAGINATION_SIZE } from "src/utils/constants";
import { useRouter } from "next/router";
import { Path } from "src/utils/Path";
import Center from "src/components/commons/Center";

const NotificationsList = () => {
  const { user } = useUser();
  const {
    data: notifications,
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = useGetNotification(user?.userId ?? "");
  const { users, isLoading: isGetUsersLoading } = useGetUserByIdParallel(
    notifications
      ? notifications.map((notification) => {
          return notification.senderId;
        })
      : []
  );
  const [transformedUsers, setTransformedUsers] = useState<
    { [k: string]: UserType } | undefined
  >(undefined);
  const { getCourseByLectureId } = useAccessCourseByLectureId();
  const router = useRouter();
  const [coursesId, setCoursesId] = useState<
    { [k: string]: string } | undefined
  >(undefined);
  const [isGetCourseIdLoading, setGetCourseIdLoading] =
    useState<boolean>(false);
  const { markReadNotification } = useMarkReadNotification();

  const LoadingSkeleton = useCallback(
    () => (
      <>
        {new Array(DEFAULT_PAGINATION_SIZE.NOTIFICATIONS_SIZE)
          .fill(1)
          .map((index) => {
            return (
              <Box key={index} padding="15px 5px">
                <Skeleton avatar active paragraph={{ rows: 1 }} />
              </Box>
            );
          })}
      </>
    ),
    []
  );

  const scrollParentRef = useRef(null);

  useEffect(() => {
    const handleGetCoursesId = async () => {
      setGetCourseIdLoading(true);
      if (notifications) {
        const updatedCoursesId = { ...(coursesId ? coursesId : {}) };
        for (const notification of notifications) {
          const lectureId = notification.objectableId;
          if (!updatedCoursesId[lectureId]) {
            const { courseId } = await getCourseByLectureId(lectureId);
            updatedCoursesId[lectureId] = courseId;
          }
        }

        setCoursesId(updatedCoursesId);
      }
      setGetCourseIdLoading(false);
    };

    // get user
    if (users) {
      let usersById = { ...(transformedUsers ? transformedUsers : {}) };
      usersById = users?.reduce(
        (prev, user) => ({ ...prev, [user?.userId as string]: user }),
        {}
      );
      setTransformedUsers(usersById);
    }

    // get course ID
    handleGetCoursesId();
  }, [JSON.stringify(users)]);

  const notificationsItems = useMemo(() => {
    return Boolean(coursesId)
      ? notifications?.map((notification) => {
          return {
            key: notification.id,
            label: (
              <Box
                onClick={() => {
                  router.push(
                    `${Path.courses}/learn/${
                      coursesId?.[notification.objectableId]
                    }?lectureId=${notification.objectableId}`
                  );
                  markReadNotification(notification.id);
                }}
                display="flex"
                padding="15px 10px 15px 5px"
              >
                {!notification.read && (
                  <Box
                    width="15px"
                    height="15px"
                    bg="danger"
                    borderRadius="rounded"
                    margin="0 5px 0 0"
                    className="flex-shrink-0"
                    key={notification.id}
                  />
                )}
                <Box
                  width="55px"
                  height="55px"
                  borderRadius="rounded"
                  overflow="hidden"
                  margin="0 10px 0 0"
                >
                  <ImageComponent
                    src={
                      transformedUsers?.[notification.senderId]?.avatarUrl ?? ""
                    }
                    fallBack="/assets/ava.png"
                    alt="ava"
                  />
                </Box>
                <Box>
                  <Box display="flex" alignItems="center">
                    <Text
                      fontSize="base"
                      fontWeight="bold"
                      lineHeight="large"
                      color="text"
                    >
                      {transformedUsers?.[notification.senderId]?.fullName}
                    </Text>
                    <Box
                      width="5px"
                      height="5px"
                      bg="textLight"
                      borderRadius="rounded"
                      margin="0 6px"
                      className="flex-shrink-0"
                    />
                    <Box className="flex-shrink-0">
                      <Text
                        fontSize="xs"
                        fontWeight="regular"
                        lineHeight="normal"
                        color="textLight"
                      >
                        {DateTimeUtils.convertToTimeAgo(
                          typeof notification.createdAt === "number"
                            ? Number(notification.createdAt)
                            : new Date(notification.createdAt).getTime()
                        )}
                      </Text>
                    </Box>
                  </Box>
                  <Text
                    fontSize="sm"
                    fontWeight="regular"
                    lineHeight="normal"
                    color="text"
                  >
                    {
                      NotificationMapperContent[
                        notification.type as keyof typeof NotificationMapperContent
                      ]
                    }
                  </Text>
                </Box>
              </Box>
            ),
          };
        })
      : undefined;
  }, [
    JSON.stringify(notifications),
    JSON.stringify(transformedUsers),
    JSON.stringify(coursesId),
  ]);

  return (
    <Box width="400px" borderRadius="md" boxShadow="box">
      <Box
        width="100%"
        height="550px"
        overflow="scroll"
        borderRadius="md"
        bg="white"
        id="scrollableDiv"
        ref={scrollParentRef}
      >
        {notifications?.length !== 0 ? (
          <InfiniteScroll
            loadMore={fetchNextPage}
            hasMore={hasNextPage ?? false}
            loader={undefined}
            useWindow={false}
            getScrollParent={() => scrollParentRef.current}
            threshold={150}
          >
            {!(isGetUsersLoading || isGetCourseIdLoading) ? (
              <StyledMenu
                style={{ boxShadow: "none" }}
                title="Notifications"
                items={notificationsItems}
              ></StyledMenu>
            ) : null}
            {(isLoading ||
              isGetUsersLoading ||
              isGetCourseIdLoading ||
              !Boolean(transformedUsers) ||
              !Boolean(coursesId)) &&
              hasNextPage && (
                <Box padding="15px 5px">
                  <LoadingSkeleton />
                </Box>
              )}
          </InfiniteScroll>
        ) : (
          <Center width="100%" className="flex-col p-4">
            <Box width="100%" height="300px">
              <ImageComponent src="/assets/empty.png" alt="empty" />
            </Box>
            <Text
              fontSize="sm"
              fontWeight="medium"
              lineHeight="large"
              color="text"
            >
              Currently we cant find any notifications
            </Text>
          </Center>
        )}
      </Box>
    </Box>
  );
};

export default NotificationsList;
