export const GLOBAL_LOADING = "GLOBAL_LOADING";
export const GLOBAL_LOADED = "GLOBAL_LOADED";

const initialState = {
    data: [],
};
  
const dispatch = (state , action) => {
    console.log(action.type)
    switch (action.type) {
      case GLOBAL_LOADING:
        return console.log(2)
  
      // default를 쓰지 않으면 맨처음 state에 count값이 undefined가 나옵니다 꼭! default문을 넣으세요
      default:
        return state;
    }
};

export default dispatch;