"use client";

export default function RSVPRow(params) {
    const user = params.user;
    const editUserRSVP = params.editUserRSVP;

    return (
          <div
            className="grid grid-cols-5 items-center text-center bg-gray-200 rounded p-2 mx-2"
          >
            <div className="col-span-1">{user.first_name + " " + user.last_name}</div>
            <div className="col-span-1">{user.email}</div>
            <div className="col-span-3 flex flex-row justify-between px-10 items-center space-x-4">
              {
                Object.entries(user.rsvp).map(([date, isAttending]) => {if (date !== "compcode") {
                  return (<div key={date} className="flex flex-row justify-center items-center space-x-2">
                    <div>{date}</div>
                    <input
                      type="checkbox"
                      checked={isAttending}
                      onChange={(e) => editUserRSVP(user.discord_id, date, e.target.checked)}
                      className="h-6 w-6 hover:cursor-pointer"
                    />
                  </div>
                )}})
              }
            </div>
          </div>
    )
}