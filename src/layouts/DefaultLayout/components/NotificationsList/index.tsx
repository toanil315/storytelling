import React, { useCallback, useEffect, useMemo, useRef } from "react";
import Box from "src/components/commons/Box";
import useGetNotification from "src/hooks/apis/User/useGetNotifications";
import { NotificationMapperContent } from "../../constants";
import DateTimeUtils from "src/utils/DateTimeUtils";
import InfiniteScroll from "react-infinite-scroller";
import { Skeleton } from "antd";
import { useUser } from "src/hooks/apis";
import Text from "src/components/commons/Typography";
import { StyledMenu } from "src/components/commons/Menu/styles";

const NotificationsList = () => {
  const { user } = useUser();
  const {
    data: notifications,
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = useGetNotification(user?.userId ?? "");

  const LoadingSkeleton = useCallback(
    () => (
      <>
        <Box padding="15px 5px">
          <Skeleton avatar active paragraph={{ rows: 1 }} />
        </Box>
        <Box padding="15px 5px">
          <Skeleton avatar active paragraph={{ rows: 1 }} />
        </Box>
        <Box padding="15px 5px">
          <Skeleton avatar active paragraph={{ rows: 1 }} />
        </Box>
        <Box padding="15px 5px">
          <Skeleton avatar active paragraph={{ rows: 1 }} />
        </Box>
        <Box padding="15px 5px">
          <Skeleton avatar active paragraph={{ rows: 1 }} />
        </Box>
      </>
    ),
    []
  );

  const scrollParentRef = useRef(null);

  console.log(isLoading);

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
        >
          <StyledMenu
            style={{ boxShadow: "none" }}
            title="Notifications"
            items={notifications?.map((notification) => {
              return {
                key: notification.id,
                label: (
                  <Box display="flex" padding="15px 5px">
                    {!notification.read && (
                      <Box
                        width="15px"
                        height="15px"
                        bg="danger"
                        borderRadius="rounded"
                        margin="0 20px 0 0"
                        className="flex-shrink-0"
                        key={notification.id}
                      />
                    )}
                    <Box>
                      <Box display="flex" alignItems="center">
                        <Text
                          fontSize="base"
                          fontWeight="bold"
                          lineHeight="large"
                          color="text"
                        >
                          {notification.senderId}
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
                              new Date(notification.createdAt).getTime()
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

        {isLoading && (
          <Box padding="15px 5px">
            <LoadingSkeleton />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default NotificationsList;
