"use client"

import { getAllUser } from "@/lib/actions";
import { User } from "@prisma/client";
import { useEffect, useState } from "react";

function ListUserComponents() {

    const [users, setUsers] = useState<User[]>([]);

    const getData = async () => {
        const lst = await getAllUser();
        setUsers(lst);
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <div className="flex flex-col justify-center items-center">
            <ul className="bg-muted p-2 rounded-sm ">
                {users.map((usr, index) => (
                    <li className="bg-white mb-1 flex items-center justify-between p-1 overflow-y-auto" key={index}>
                        {/* <div className="flex flex-col font-thin">
                            <p> {usr.firstname} </p>
                            <p> {usr.email} </p>
                        </div> */}
                        <p> {usr.name} </p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ListUserComponents;