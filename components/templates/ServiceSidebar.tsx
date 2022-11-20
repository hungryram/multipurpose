import Link from "next/link"

export default function ServiceSidebar({ serviceList }: any) {
    return (
        <div className="md:w-1/3 bg-slate-100" style={{ borderTop: '4px solid #F6851F' }}>
            <div className="p-10">
                <h3 className="font-bold text-xl mb-8">More Services</h3>
                {serviceList ?
                    <ul>
                        {serviceList.map((node) => {
                            return (
                                <>
                                    <li className="bg-white my-2"><Link href={"/services/" + node.slug.current} className="flex items-center px-4 py-4 hover:bg-orange-600 hover:text-white transition-all ease-linear font-bold">{node.title}</Link></li>
                                </>
                            )
                        })}
                    </ul>
                    :
                    <p>No services has been added</p>
                }
            </div>
        </div>
    )
}