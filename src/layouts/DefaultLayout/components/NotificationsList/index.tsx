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
import { useGetUserByIdParallel, useUser } from "src/hooks/apis";
import Text from "src/components/commons/Typography";
import { StyledMenu } from "src/components/commons/Menu/styles";
import { UserType } from "src/data-model/UserTypes";
import ImageComponent from "src/components/commons/Image";
import { DEFAULT_PAGINATION_SIZE } from "src/utils/constants";

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

  const LoadingSkeleton = useCallback(
    () => (
      <>
        {new Array(DEFAULT_PAGINATION_SIZE.NOTIFICATIONS_SIZE).map(() => {
          return (
            <Box padding="15px 5px">
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
    if (users) {
      const usersById = users?.reduce(
        (prev, user) => ({ ...prev, [user?.userId as string]: user }),
        {}
      );
      setTransformedUsers(usersById);
    }
  }, [JSON.stringify(users)]);

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
        <InfiniteScroll
          loadMore={fetchNextPage}
          hasMore={hasNextPage ?? false}
          loader={undefined}
          useWindow={false}
          getScrollParent={() => scrollParentRef.current}
          threshold={150}
        >
          <StyledMenu
            style={{ boxShadow: "none" }}
            title="Notifications"
            items={notifications?.map((notification) => {
              return {
                key: notification.id,
                label: (
                  <Box display="flex" padding="15px 10px 15px 5px">
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
                        src={user?.avatarUrl ?? "/assets/ava.png"}
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
            })}
          ></StyledMenu>
        </InfiniteScroll>

        {(isLoading || isGetUsersLoading) && hasNextPage && (
          <Box padding="15px 5px">
            <LoadingSkeleton />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default NotificationsList;
