import React from "react";

function ResentActivity() {
    return (
        <div
            className="rounded-lg border bg-card text-card-foreground shadow-sm"
            data-v0-t="card"
        >
            <div className="flex-col space-y-1.5 p-6 flex items-center justify-between">
                <div className="text-sm font-medium">Recent Activity</div>
                <a
                    className="text-sm font-medium text-primary"
                    href="#"
                    rel="ugc"
                >
                    View All
                </a>
            </div>
            <div className="p-6">
                <div className="grid gap-4">
                    <div className="flex items-center gap-4">
                        <div className="bg-accent rounded-md flex items-center justify-center aspect-square w-10">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="w-5 h-5 text-accent-foreground"
                            >
                                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                <polyline points="9 22 9 12 15 12 15 22"></polyline>
                            </svg>
                        </div>
                        <div>
                            <div className="font-medium">New Project Added</div>
                            <div className="text-sm text-muted-foreground">
                                www.example.com
                            </div>
                        </div>
                        <div className="ml-auto text-sm text-muted-foreground">
                            3h ago
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="bg-accent rounded-md flex items-center justify-center aspect-square w-10">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="w-5 h-5 text-accent-foreground"
                            >
                                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                            </svg>
                        </div>
                        <div>
                            <div className="font-medium">
                                New Documentation Added
                            </div>
                            <div className="text-sm text-muted-foreground">
                                docs.example.com
                            </div>
                        </div>
                        <div className="ml-auto text-sm text-muted-foreground">
                            1 day ago
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="bg-accent rounded-md flex items-center justify-center aspect-square w-10">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="w-5 h-5 text-accent-foreground"
                            >
                                <rect
                                    width="7"
                                    height="18"
                                    x="3"
                                    y="3"
                                    rx="1"
                                ></rect>
                                <rect
                                    width="7"
                                    height="7"
                                    x="14"
                                    y="3"
                                    rx="1"
                                ></rect>
                                <rect
                                    width="7"
                                    height="7"
                                    x="14"
                                    y="14"
                                    rx="1"
                                ></rect>
                            </svg>
                        </div>
                        <div>
                            <div className="font-medium">New App Added</div>
                            <div className="text-sm text-muted-foreground">
                                app.example.com
                            </div>
                        </div>
                        <div className="ml-auto text-sm text-muted-foreground">
                            2 days ago
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResentActivity;
