import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

function time(createdAt) {
    const oneWeekAgo = new Date() - (1 * 7 * 24 * 60 * 60 * 1000);
    if(createdAt < oneWeekAgo){
        return(dayjs(createdAt).format("h:mm a on M/D/YYYY"));
    }else{
        return(dayjs(createdAt).fromNow());
    }

}
export default time;