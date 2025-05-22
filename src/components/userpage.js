'use client';

import { useEffect, useState } from "react";
import { addNewUserAction, fetchUserAction, deleteUserAction, editUserAction } from "@/actions";
import styles from "@/styles/userpage.module.css";
export default function UserPage() {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);

    async function HandleFetchUserData() {
        const allUsers = await fetchUserAction();
        setUsers(allUsers);
    }

    useEffect(() => {
        HandleFetchUserData();
    }, []);

    async function HandleAddNewUser(formData) {
        if (editingUser) {
            await editUserAction(editingUser.id, formData, "/user-management");
            setEditingUser(null);
        } else {
            await addNewUserAction(formData, "/user-management");
        }
        formData.set("username", "");
        HandleFetchUserData();
    }

    async function HandleDeleteUserData(currentUserId) {
        await deleteUserAction(currentUserId, "/user-management");
        HandleFetchUserData();
    }

    function HandleEditUserData(user) {
        const form = document.getElementById("user-form");

        for (const key in user) {
            if (form.elements.namedItem(key)) {
                if (key === "birthdate") {
                    const isoDate = new Date(user.birthdate).toISOString().split("T")[0]; // "yyyy-MM-dd"
                    form.elements.namedItem("birthdate").value = isoDate;
                } else {
                    form.elements.namedItem(key).value = user[key];
                }
            }
        }
        setEditingUser(user);
    }
    return (
        <>
            <section className={styles.SEC_HDR_H1}>
                <h1>User Management</h1>
            </section>
            <form id="user-form" className={styles.MAIN_FRM_SEC} action={HandleAddNewUser}>
                <div className={styles.MAIN_FRM_DIV}>
                    <div className={styles.MAIN_FRM_DIV_D}>
                        <label className={styles.MAIN_FRM_LBL}>UserName</label>
                        <input className={styles.MAIN_FRM_IP} required type="text" id="username" name="username" placeholder="Enter Username" />
                    </div>
                    <div className={styles.MAIN_FRM_DIV_D}>
                        <label className={styles.MAIN_FRM_LBL}>UserEmail</label>
                        <input className={styles.MAIN_FRM_IP} required type="email" id="useremail" name="useremail" placeholder="Enter User Email" />
                    </div>
                    <div className={styles.MAIN_FRM_DIV_D}>
                        <label className={styles.MAIN_FRM_LBL}>User Position</label>
                        <input className={styles.MAIN_FRM_IP} required type="text" id="position" name="position" placeholder="Enter User Position" />
                    </div>
                    <div className={styles.MAIN_FRM_DIV_D}>
                        <label className={styles.MAIN_FRM_LBL}>User Skills</label>
                        <input className={styles.MAIN_FRM_IP} required type="text" id="skills" name="skills" placeholder="Enter Skills" />
                    </div>
                    <div className={styles.MAIN_FRM_DIV_D}>
                        <label className={styles.MAIN_FRM_LBL}>User Phone</label>
                        <input className={styles.MAIN_FRM_IP} required type="number" id="phone" name="phone" placeholder="Enter Phone Number" />
                    </div>
                    <div className={styles.MAIN_FRM_DIV_D}>
                        <label className={styles.MAIN_FRM_LBL}>User Address</label>
                        <input className={styles.MAIN_FRM_IP} required type="text" id="address" name="address" placeholder="Enter User Address" />
                    </div>
                    <div className={styles.MAIN_FRM_DIV_D}>
                        <label className={styles.MAIN_FRM_LBL}>User Age</label>
                        <input className={styles.MAIN_FRM_IP} required type="number" id="age" name="age" placeholder="Enter User Age" />
                    </div>
                    <div className={styles.MAIN_FRM_DIV_D}>
                        <label className={styles.MAIN_FRM_LBL}>User Birthdate</label>
                        <input className={styles.MAIN_FRM_IP} required type="date" id="birthdate" name="birthdate" placeholder="Enter User Birth Date" />
                    </div>
                </div>
                <div className={styles.MAIN_FRM_BTN_D}>
                    <input className={styles.MAIN_FRM_BTN} type="submit" value={editingUser ? "Update User" : "Add User"} />
                </div>
            </form>
            <section className={styles.FRM_DATA_SEC}>
                {users.map(user => (
                    <div key={user.id} className={styles.FRM_DATA}>
                        <p><strong>Name:</strong> {user.username}</p>
                        <p><strong>Email:</strong> {user.useremail}</p>
                        <p><strong>Position:</strong> {user.position}</p>
                        <p><strong>Skills:</strong> {user.skills}</p>
                        <p><strong>Phone:</strong> {user.phone}</p>
                        <p><strong>Address:</strong> {user.address}</p>
                        <p><strong>Age:</strong> {user.age}</p>
                        <p><strong>Birthdate:</strong> {new Date(user.birthdate).toLocaleDateString()}</p>
                        <div className={styles.FRM_DATA_BTN_DIV}>
                            <button className={styles.MAIN_FRM_BTN} onClick={() => HandleEditUserData(user)}>Edit</button>
                            <button className={styles.MAIN_FRM_BTN} onClick={() => HandleDeleteUserData(user.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </section>
        </>
    );
}
