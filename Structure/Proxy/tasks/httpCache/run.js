import axiosCache from "./axiosCache";

const run = async () => {
  const result = await axiosCache.get('https://randomuser.me/api');
  console.info(result.data.results[0].name);

  const result2 = await axiosCache.get('https://randomuser.me/api');
  console.info(result2.data.results[0].name);

  const result3 = await axiosCache.get('https://randomuser.me/api');
  console.info(result3.data.results[0].name);
}

run();
