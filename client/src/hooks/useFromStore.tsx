import { useEffect, useState } from "react";

/*
*Truy xuất trạng thái từ store của Zustand.
*Đồng bộ trạng thái này với state cục bộ trong React component.
*Đảm bảo trạng thái được cập nhật khi Zustand store thay đổi.
store: Hàm truy xuất store của Zustand.
storeCallback: Hàm truy xuất trạng thái từ store.
*/
export default function useFromStore<T, F>(
    store: (callback: (state: T) => unknown) => unknown,
    storeCallback: (state: T) => F
   ) {
       const [state, setState] = useState<F>()
   
       const stateOfStore = store(storeCallback) as F
   
       useEffect(() => {
        setState(stateOfStore)
       }, [stateOfStore])
   
      return state
   }

