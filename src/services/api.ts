export const getCovidDatas = {
  oneCity: async (date: String) => {
    try {
      const res = await fetch(`https://coronavirusapi-france.now.sh/AllDataByDate?date=${date}`);
      const result = res.json();

      return result;
    } catch (e) {
      console.log(e)
    }
	}
}