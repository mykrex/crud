interface calificationProps{
    tittle: string;
    num: number;
}

const CalificationCard: React.FC<calificationProps> = ({ tittle, num}) => {
    return(
        <div className="items-center flex p-2 gap-2 bg-gray-700 rounded-md">
            <h1>{tittle}</h1>
            <span>{num}</span>
        </div>
    );
};

export default CalificationCard;