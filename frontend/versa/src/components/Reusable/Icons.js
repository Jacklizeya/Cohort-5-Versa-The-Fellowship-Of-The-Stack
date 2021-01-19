import React from "react";

const Icons = (props) => {
    switch (props.type) {
        case "tool":
            return (
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12.0898 2.91C10.0798 0.9 7.06976 0.49 4.64976 1.67L8.98976 6.01L5.98976 9.01L1.64976 4.67C0.479759 7.1 0.889759 10.09 2.89976 12.1C4.75976 13.96 7.47976 14.45 9.78976 13.58L18.8998 22.69C19.2898 23.08 19.9198 23.08 20.3098 22.69L22.6098 20.39C22.9998 20 22.9998 19.37 22.6098 18.98L13.5398 9.9C14.4598 7.56 13.9798 4.8 12.0898 2.91Z"
                        fill="#444"
                        fillOpacity="0.87"
                    />
                </svg>
            );
        case "refresh":
            return (
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M19 8L15 12H18C18 15.31 15.31 18 12 18C10.99 18 10.03 17.75 9.2 17.3L7.74 18.76C8.97 19.54 10.43 20 12 20C16.42 20 20 16.42 20 12H23L19 8ZM6 12C6 8.69 8.69 6 12 6C13.01 6 13.97 6.25 14.8 6.7L16.26 5.24C15.03 4.46 13.57 4 12 4C7.58 4 4 7.58 4 12H1L5 16L9 12H6Z"
                        fill="#444"
                        fillOpacity="0.87"
                    />
                </svg>
            );
        case "search":
            return (
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z"
                        fill="#444"
                        fillOpacity="0.87"
                    />
                </svg>
            );
        case "heart":
            return (
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z"
                        fill="#444"
                        fillOpacity="0.87"
                    />
                </svg>
            );

        case "setting":
            return (
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M19.1235 12.936C19.1595 12.636 19.1835 12.324 19.1835 12C19.1835 11.676 19.1595 11.364 19.1115 11.064L21.1395 9.47999C21.3195 9.33599 21.3675 9.07199 21.2595 8.86799L19.3395 5.54399C19.2195 5.32799 18.9675 5.25599 18.7515 5.32799L16.3635 6.28799C15.8595 5.90399 15.3315 5.59199 14.7435 5.35199L14.3835 2.80799C14.3475 2.56799 14.1435 2.39999 13.9035 2.39999H10.0635C9.82351 2.39999 9.63151 2.56799 9.59551 2.80799L9.23551 5.35199C8.64751 5.59199 8.10751 5.91599 7.61551 6.28799L5.2275 5.32799C5.0115 5.24399 4.75951 5.32799 4.63951 5.54399L2.71951 8.86799C2.59951 9.08399 2.64751 9.33599 2.83951 9.47999L4.86751 11.064C4.81951 11.364 4.7835 11.688 4.7835 12C4.7835 12.312 4.8075 12.636 4.8555 12.936L2.82751 14.52C2.64751 14.664 2.59951 14.928 2.70751 15.132L4.62751 18.456C4.74751 18.672 4.99951 18.744 5.21551 18.672L7.60351 17.712C8.10751 18.096 8.63551 18.408 9.22351 18.648L9.58351 21.192C9.63151 21.432 9.82351 21.6 10.0635 21.6H13.9035C14.1435 21.6 14.3475 21.432 14.3715 21.192L14.7315 18.648C15.3195 18.408 15.8595 18.084 16.3515 17.712L18.7395 18.672C18.9555 18.756 19.2075 18.672 19.3275 18.456L21.2475 15.132C21.3675 14.916 21.3195 14.664 21.1275 14.52L19.1235 12.936V12.936ZM11.9835 15.6C10.0035 15.6 8.3835 13.98 8.3835 12C8.3835 10.02 10.0035 8.39999 11.9835 8.39999C13.9635 8.39999 15.5835 10.02 15.5835 12C15.5835 13.98 13.9635 15.6 11.9835 15.6Z"
                        fill="black"
                        fillOpacity="0.87"
                    />
                </svg>
            );
        case "visible":
            return (
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 5C7 5 2.73 8.11 1 12.5C2.73 16.89 7 20 12 20C17 20 21.27 16.89 23 12.5C21.27 8.11 17 5 12 5ZM12 17.5C9.24 17.5 7 15.26 7 12.5C7 9.74 9.24 7.5 12 7.5C14.76 7.5 17 9.74 17 12.5C17 15.26 14.76 17.5 12 17.5ZM12 9.5C10.34 9.5 9 10.84 9 12.5C9 14.16 10.34 15.5 12 15.5C13.66 15.5 15 14.16 15 12.5C15 10.84 13.66 9.5 12 9.5Z"
                        fill="#444"
                        fillOpacity="0.87"
                    />
                </svg>
            );
        case "filledTick":
            return (
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"
                        fill="black"
                        fillOpacity="0.87"
                    />
                </svg>
            );
            case 'outlineTick':
                return(<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M16.59 7.58L10 14.17L6.41 10.59L5 12L10 17L18 9L16.59 7.58ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z" fill="black" fillOpacity="0.87"/>
                </svg>
                )
            case 'tick':
                return(<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M9.00039 16.2L4.80039 12L3.40039 13.4L9.00039 19L21.0004 7.00001L19.6004 5.60001L9.00039 16.2Z" fill="black" fillOpacity="0.87"/>
                </svg>
                )
            case 'miniburger':
                return(<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M20 9H4V11H20V9ZM4 15H20V13H4V15Z" fill="black" fillOpacity="0.87"/>
                </svg>
                )
            
            case 'filledBookmark':
                return(<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M17 3H7C5.9 3 5 3.9 5 5V21L12 18L19 21V5C19 3.9 18.1 3 17 3Z" fill="black" fillOpacity="0.87"/>
                </svg>
                )

            case 'outlineBookmark':
                return(<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M17 3H7C5.9 3 5 3.9 5 5V21L12 18L19 21V5C19 3.9 18.1 3 17 3ZM17 18L12 15.82L7 18V5H17V18Z" fill="black" fillOpacity="0.87"/>
                </svg>
                )
            
            case 'filledError':
                return(<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="black" fillOpacity="0.87"/>
                </svg>
                )
            
            case 'outlineError':
                return(<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M11 15H13V17H11V15ZM11 7H13V13H11V7ZM11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z" fill="black" fillOpacity="0.87"/>
                </svg>
                )

            case 'alarmBellError':
                return(<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clipRule="evenodd" d="M12 23C13.1 23 13.99 22.11 13.99 21.01H10.01C10.01 22.11 10.9 23 12 23ZM19 17V11C19 7.65 16.64 4.85 13.5 4.17V3C13.5 2.17 12.83 1.5 12 1.5C11.17 1.5 10.5 2.17 10.5 3V4.17C7.36 4.85 5 7.65 5 11V17L3 19V20H21V19L19 17ZM13 16H11V14H13V16ZM13 12H11V8H13V12Z" fill="#444444" fillOpacity="0.87"/>
                </svg>
                )
            
            case 'add':
                return(<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="#444444" fillOpacity="0.87"/>
                </svg>
                )

            case 'copy':
                return(<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM19 21H8V7H19V21Z" fill="#444444" fillOpacity="0.87"/>
                </svg>
                )
        default:
            return <></>;
    }
};

export default Icons;
