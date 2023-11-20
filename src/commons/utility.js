import { format } from "date-fns";


export const formatDate = (inputDate) => {
    const date = new Date(
      inputDate.substring(0, 4),
      inputDate.substring(4, 6) - 1,
      inputDate.substring(6, 8),
      inputDate.substring(8, 10),
      inputDate.substring(10, 12)

    );
    console.log("tata" , format(date, 'yyyy-MM-dd HH:mm')); // Output: '2023-09-01 07:40'

    return format(date, 'yyyy-MM-dd HH:mm');
  };

