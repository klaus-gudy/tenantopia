import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const activities = [
    {
        user: { name: "John Doe", avatar: "/avatars/john-doe.jpg" },
        action: "signed a new lease",
        property: "Arcade Square",
        time: "2 hours ago",
    },
    {
        user: { name: "Jane Smith", avatar: "/avatars/jane-smith.jpg" },
        action: "submitted a maintenance request",
        property: "Palm Heights",
        time: "5 hours ago",
    },
    {
        user: { name: "Bob Johnson", avatar: "/avatars/bob-johnson.jpg" },
        action: "made a payment",
        property: "Sunset Apartments",
        time: "1 day ago",
    },
]

export function RecentActivity() {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                <AvatarFallback>
                  {activity.user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {activity.user.name} {activity.action}
                </p>
                <p className="text-sm text-muted-foreground">{activity.property}</p>
              </div>
              <div className="ml-auto font-medium text-sm text-muted-foreground">{activity.time}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}