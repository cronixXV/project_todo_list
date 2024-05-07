export function debounce(func, delay) {
  let debounceTimeout;
  return function () {
    const context = this;
    const args = arguments;
    // console.log(context, args)
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => func.apply(context, args), delay);
  };
}
