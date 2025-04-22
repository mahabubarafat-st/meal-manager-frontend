import React from 'react';

export default function SettingsPage() {
    return (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded shadow">
            <h1 className="text-5xl font-extrabold mb-10 text-center">Settings</h1>
            <form className="flex flex-col items-center gap-10">
                {/* Horizontal fields row */}
                <div className="flex flex-row flex-wrap justify-center gap-8 w-full">
                    <div className="flex flex-col items-start">
                        <label htmlFor="email" className="font-medium mb-2">Email</label>
                        <input id="email" name="email" type="email" className="border p-2 rounded w-56" placeholder="Update your email" />
                    </div>
                    <div className="flex flex-col items-start">
                        <label htmlFor="phone" className="font-medium mb-2">Phone</label>
                        <input id="phone" name="phone" type="tel" className="border p-2 rounded w-56" placeholder="Update your phone number" />
                    </div>
                    <div className="flex flex-col items-start">
                        <label htmlFor="pin" className="font-medium mb-2">UPDATE PIN</label>
                        <input id="pin" name="pin" type="password" className="border p-2 rounded w-56" placeholder="Update your PIN" />
                    </div>
                    <div className="flex flex-col items-start">
                        <label htmlFor="pin" className="font-medium mb-2">CONFIRM PIN</label>
                        <input id="pin" name="pin" type="password" className="border p-2 rounded w-56" placeholder="Update your PIN" />
                    </div>
                    <div className="flex flex-col items-start">
                        <label htmlFor="name" className="font-medium mb-2">Name</label>
                        <input id="name" name="name" type="text" className="border p-2 rounded w-56" placeholder="Update your name" />
                    </div>
                    <div className="flex flex-col items-start">
                        <label htmlFor="room" className="font-medium mb-2">Room No.</label>
                        <input id="room" name="room" type="text" className="border p-2 rounded w-56" placeholder="Update your room number" />
                    </div>
                </div>
                <button type="submit" className="bg-green-600 text-white py-2 px-8 rounded hover:bg-green-700 mx-auto block text-lg font-semibold">Save Changes</button>
            </form>
        </div>
    );
}