export default function Hours({
    monday, tuesday, wednesday, thursday, friday, saturday, sunday
}: any) {
    return (
        <>
            <h3 className="uppercase font-semibold mb-4">HOURS</h3>
            <ul>
                {monday && <li><span className="font-bold">Mon:</span> {monday}</li>}
                {tuesday && <li><span className="font-bold">Tues:</span> {tuesday}</li>}
                {wednesday && <li><span className="font-bold">Wed:</span> {wednesday}</li>}
                {thursday && <li><span className="font-bold">Thur:</span> {thursday}</li>}
                {friday && <li><span className="font-bold">Fri:</span> {friday}</li>}
                {saturday && <li><span className="font-bold">Sat:</span> {saturday}</li>}
                {sunday && <li><span className="font-bold">Sun:</span> {sunday}</li>}
            </ul>
        </>
    )
}