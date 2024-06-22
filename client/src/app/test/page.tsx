'use client';
import InfiniteScroll from '@/components/ui/infinity-scoll';
import { axiosWithAuth } from '@/lib/axios';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
// import Product from "../admin/product/page";

export default () => {
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const next = async () => {
    setLoading(true);

    /**
     * Intentionally delay the search by 800ms before execution so that you can see the loading spinner.
     * In your app, you can remove this setTimeout.
     **/
    setTimeout(async () => {
      const res = await axiosWithAuth(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExODMwMzYyMDMwMzc2OTI4NzM3NCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcxODg3MzI1NywiZXhwIjoxNzE5NDc4MDU3fQ.lqW6X_RAFEokMpwcAaN7RuglMZvscytaK15h76Wrs1Q',
      ).get(`/api/notification?take=3&skip=${3 * page}`);
      const data = res.data;
      console.log(data);
      // setProducts((prev) => [...prev, ...data.products]);
      setNotifications((prev) => [...prev, ...data]);
      setPage((prev) => prev + 1);

      // Usually your response will tell you if there is no more data.
      if (data.length < 3) {
        setHasMore(false);
      }
      setLoading(false);
      console.log('fetching');
    }, 800);
  };
  return (
    <div className="max-h-[300px] w-full  overflow-y-auto px-10">
      <div className="flex w-full flex-col items-center  gap-3">
        {notifications.length !== 0 &&
          notifications.map((notification: any) => (
            // <Product key={notification.id} notification={notification} />
            <div
              key={notification._id}
              className="flex items-center space-x-2 p-2"
            >
              <div className="flex flex-col space-y-1">
                <span className="text-sm">{notification.title}</span>
                <span className="text-xs text-gray-500">
                  {notification?.content}
                </span>
              </div>
            </div>
          ))}
        <InfiniteScroll
          hasMore={hasMore}
          isLoading={loading}
          next={next}
          threshold={1}
        >
          {hasMore && <Loader2 className="my-4 h-8 w-8 animate-spin" />}
        </InfiniteScroll>
      </div>
    </div>
  );
};
