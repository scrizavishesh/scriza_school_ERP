import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSidebarContext } from '../Dashboard/DashboardLayout';
import 'bootstrap/dist/css/bootstrap.min.css';
import { logoutApi } from '../Utils/Apis';

const Container = styled.div`
    background-color: var(--sidebarBackground);
    width: ${({ sidebarOpen }) => (sidebarOpen ? '224px' : '64px')};
    transition: all 0.3s ease;
    position: sticky;
    bottom:0;

    ul {
        max-height: calc(100vh - 10vh);
        overflow: auto;
    }

    .dashed{
        list-style: none !important;
    }

    .show{
        height: 100%;
        overflow: hidden;
        transition: height .35s ease !important;
    }

    .hide{
        height: 0;
        overflow: hidden;
        transition: height .35s !important;
    }

    .modalHighborder{
        border-bottom: 2px solid var(--modalBorderColor);
    }

    .modalLightBorder{
        border-bottom: 1px solid var(--modalBorderColor);
    }

    .deleteSVG{
        position: relative;
        width: fit-content ;
        margin-left: 43% !important;
        margin-bottom: -18% !important;
        background-color: #fff;
    }

    .greydiv{
        background-color: #FBFBFB;
    }

    .borderTOP {
        border-top: 1px solid var(--borderSidebar);
    }

    .borderBottom {
        border-bottom: 1px solid var(--borderSidebar);
    }

    .menus {
        position: relative;
        padding: 1rem;
        display: flex;
        color: #000;
        align-items: center;
        white-space: nowrap;
        text-decoration : none !important;
        transition: background-color 0.3s, color 0.3s,;

        &:hover {
            background-color: #008479;
            color: #ffffff;
            border-right: 5px solid orange;
        }

        &:hover::before {
            content: "";
            position: absolute;
            right: -2.5px;
            top: 50%;
            transform: translateY(-50%);
            width: 0;
            height: 0;
            border-right: 10px solid orange;
            border-top: 5px solid transparent;
            border-bottom: 5px solid transparent;
        }

        &.active {
            background-color: var(--greenTextColor);
            color: #ffffff;
            border-right: 5px solid orange;
        }

        &.active::before {
            content: "";
            position: absolute;
            right: -2.5px;
            top: 50%;
            transform: translateY(-50%);
            width: 0;
            height: 0;
            border-right: 10px solid orange;
            border-top: 5px solid transparent;
            border-bottom: 5px solid transparent;
        }

        .menu-text {
            display: ${({ sidebarOpen }) => (sidebarOpen ? 'inline' : 'none')};
            margin-left: 10px;
            transition: margin-left 0.3s ease;
        }

        ${({ sidebarOpen }) => !sidebarOpen && `
            &:hover .menu-text {
                display: inline;
                position: absolute;
                left: 55px;
                white-space: nowrap;
                background-color: var(--greenTextColor);
                padding: 0.68rem 1.5rem 0.68rem 1.5rem;
                box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                border-right: 5px solid orange;
            }

            &:hover .menu-text::before {
                content: "";
                position: absolute;
                right: -2.5px;
                top: 50%;
                transform: translateY(-50%);
                width: 0;
                height: 0;
                border-right: 10px solid orange;
                border-top: 5px solid transparent;
                border-bottom: 5px solid transparent;
            }
        `}
    }
    
    .correvtSVG{
        position: relative;
        width: fit-content ;
        margin-left: 43% !important;
        margin-bottom: -16% !important;
        background-color: #2BB673;
        width: 73px;
        height: 73px;
        align-items: center;
    }

    .contbtn{
        margin-left: 41% !important;
        margin-top: -20% !important;
    }

    .greydiv{
        background-color: #FBFBFB;
    }


    .collapse-menu {
        padding-left: 1.5rem;
    }
`;

const StickyHeader = styled.div`
    position: sticky;
    top: 0;
    z-index: 999;
    background-color: var(--sidebarBackground);
    display: flex;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 1000px) {
        justify-content: space-between;

        .sidebarclass{
            position: relative;
        }

        .toggle-icon {
            position: absolute;
            right: -15px !important;
            margin-top: 7% !important;
            display: block !important;
        }
    }

    .toggle-icon {
        display: none;
        cursor: pointer;
        color: #fff;
    }
`;

const Sidebar = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('loggedInUserRole');

    const logoutTimerRef = useRef(null); // Use ref to store the logout timer
    const { sidebarOpen, toggleSidebar } = useSidebarContext();

    const [activeDropdowns, setActiveDropdowns] = useState({});

    const [LogoutSuccess, setLogoutSuccess] = useState(true);

    const location = useLocation();

    const [activeLink, setActiveLink] = useState(() => {
        const currentPath = location.pathname === '/' ? 'dashboard' : location.pathname.slice(1);
        localStorage.setItem('activeLink', currentPath);
        return currentPath;
    });

    useEffect(() => {
        const currentPath = location.pathname === '/' ? 'dashboard' : location.pathname.slice(1);
        setActiveLink(currentPath);
        localStorage.setItem('activeLink', currentPath);
    }, [location.pathname]);

    useEffect(() => {
        const inactivityPeriod = 24 * 60 * 60 * 1000;

        // Set the timer for auto-logout after 24 hours
        logoutTimerRef.current = setTimeout(() => {
            handleLogout();
        }, inactivityPeriod);

        // Cleanup function to clear the timer if the component unmounts
        return () => {
            clearTimeout(logoutTimerRef.current);
        };
    }, []);

    const handleUserLogout = () => {
        clearTimeout(logoutTimerRef.current);
        handleLogout();
    };

    const handleActiveLink = (link) => {
        setActiveLink(link);
        localStorage.setItem('activeLink', link);
    };

    const handleLogout = async () => {
        try {
            var response = await logoutApi();
            console.log(response)
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    localStorage.removeItem('token')
                    setLogoutSuccess(false);
                    setTimeout(() => {
                        navigate('/')
                    }, 600);
                    setTimeout(() => {
                        window.location.reload();
                        window.location.reload();
                    }, 1000);
                }
            }
            else {
                console.log(response?.data?.message);
            }
        }
        catch {

        }
    }

    // const handleActiveDropAndLink = (val) => {
    //     handleActiveLink(val);
    //     setActiveDropdowns((prev) => ({
    //         ...prev,
    //         [val]: !prev[val], // Toggle the specific dropdown by key
    //     }));
    // }

    const handleActiveDropAndLink = (val) => {
        handleActiveLink(val);
        setActiveDropdowns((prev) => {
            console.log("Previous State:", prev);
            const updatedState = { ...prev, [val]: !prev[val] };
            console.log("Updated State:", updatedState);
            return updatedState;
        });
    };


    const handleActiveWithOutDrop = (val) => {
        handleActiveLink(val);
        setActiveDropdowns({});
    }


    const superAdminMenuItems = [
        {
            title: "Dashboard",
            to: "/",
            icon: <Icon icon="clarity:dashboard-line" width="1.5em" height="1.5em" />,
            key: "dashboard",
            activeLink: ['dashboard'],
            onClickFunc: handleActiveWithOutDrop
        },
        {
            title: "Schools",
            to: "/allSchoolsPage",
            icon: <Icon icon="uil:book-open" width="1.5em" height="1.5em" />,
            key: "allSchoolsPage",
            activeLink: ['allSchoolsPage'],
            onClickFunc: handleActiveWithOutDrop
        },
        {
            title: "Add School",
            to: "/addSchoolsPage",
            icon: <Icon icon="bx:book-add" width="1.5em" height="1.5em" />,
            key: "addSchoolsPage",
            activeLink: ['addSchoolsPage'],
            onClickFunc: handleActiveWithOutDrop
        },
        {
            title: "Features",
            to: "/addons",
            icon: <Icon icon="mage:dashboard-2" width="1.5em" height="1.5em" />,
            key: "addons",
            hasDropdown: true,
            activeLink: ['addons', 'addAddons'],
            dropdownItems: [
                {
                    title: "Feature Details", to: "/addons", icon: <Icon icon="mage:dashboard-2" width="1.5em" height="1.5em" />, key: "addons", onClickFunc: handleActiveWithOutDrop
                },
                { title: "Add Features", to: "/addAddons", icon: <Icon icon="fluent:note-add-48-regular" width="1.5em" height="1.5em" />, key: "addAddons", onClickFunc: handleActiveWithOutDrop }
            ],
            onClickFunc: handleActiveDropAndLink
        },
        {
            title: "Subscription",
            to: "/subscriptionPage",
            icon: (
                <svg width="24" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.8732 5.53529C9.87343 6.61575 9.87793 7.69633 9.87197 8.77679C9.86735 9.61024 9.52792 9.96698 8.72323 9.96915C6.53043 9.97495 4.33762 9.97518 2.14481 9.96881C1.39504 9.96664 1.01667 9.61628 1.01149 8.86592C0.996189 6.61029 0.995851 4.35443 1.01239 2.0988C1.01757 1.39398 1.40697 1.01458 2.11319 1.01037C4.34336 0.99694 6.57375 0.995576 8.80392 1.01208C9.51318 1.01732 9.86364 1.40331 9.87016 2.12339C9.88063 3.26043 9.87309 4.39792 9.8732 5.53529ZM9.08596 5.45925C9.08596 4.43582 9.06896 3.41204 9.09406 2.38918C9.10464 1.9572 8.98737 1.78486 8.53168 1.78919C6.47066 1.80865 4.40931 1.80513 2.34818 1.79124C1.9446 1.78851 1.77994 1.90917 1.78321 2.3408C1.79896 4.44436 1.79649 6.54814 1.78478 8.65181C1.78265 9.03689 1.90025 9.18555 2.29978 9.18259C4.39839 9.16699 6.49711 9.16586 8.59572 9.18316C9.00999 9.18657 9.09834 9.01754 9.09215 8.64304C9.07437 7.58205 9.08596 6.52059 9.08596 5.45925Z" fill="#000" stroke="#000" strokeWidth="1" />
                    <path d="M5.48409 14.029C6.55236 14.029 7.62074 14.0249 8.689 14.0303C9.51384 14.0346 9.86835 14.3763 9.87071 15.1889C9.8769 17.4067 9.87724 19.6246 9.87038 21.8424C9.86801 22.6204 9.51013 22.9875 8.72513 22.9915C6.53232 23.0026 4.33952 23.0033 2.14671 22.9909C1.38355 22.9866 1.01261 22.6039 1.00867 21.8215C0.997412 19.6036 0.996511 17.3858 1.00957 15.1679C1.01418 14.3833 1.38512 14.0358 2.16697 14.0308C3.27249 14.0239 4.37835 14.029 5.48409 14.029ZM9.08516 18.4867C9.08516 17.4254 9.07795 16.3641 9.08955 15.3028C9.09303 14.9814 9.01639 14.8175 8.65411 14.8194C6.51803 14.831 4.38183 14.8304 2.24564 14.8197C1.90035 14.818 1.78544 14.9546 1.78646 15.2886C1.79343 17.4302 1.79512 19.5719 1.78511 21.7133C1.78331 22.0875 1.93321 22.2083 2.28863 22.2067C4.38724 22.1972 6.48607 22.1946 8.58467 22.2085C8.98544 22.2111 9.09855 22.0545 9.0918 21.6704C9.07312 20.6096 9.08527 19.5481 9.08516 18.4867Z" fill="#000" stroke="#000" strokeWidth="1" />
                    <path d="M11.8867 3.51653C11.8867 3.26645 11.8867 3.06019 11.8867 2.80658C15.5837 2.80658 19.2782 2.80658 23.0008 2.80658C23.0008 3.03742 23.0008 3.25723 23.0008 3.51653C19.3107 3.51653 15.6299 3.51653 11.8867 3.51653Z" fill="#000" stroke="#000" strokeWidth="1" />
                    <path d="M11.8906 16.524C11.8906 16.2643 11.8906 16.0437 11.8906 15.7906C15.592 15.7906 19.2704 15.7906 22.9886 15.7906C22.9886 16.0262 22.9886 16.2584 22.9886 16.524C19.3055 16.524 15.6266 16.524 11.8906 16.524Z" fill="#000" stroke="#000" strokeWidth="1" />
                    <path d="M19.0614 7.48438C19.0614 7.73582 19.0614 7.95677 19.0614 8.20969C16.6681 8.20969 14.297 8.20969 11.8965 8.20969C11.8965 7.96644 11.8965 7.74561 11.8965 7.48438C14.2619 7.48438 16.6338 7.48438 19.0614 7.48438Z" fill="#000" stroke="#000" strokeWidth="1" />
                    <path d="M11.8965 21.2016C11.8965 20.9478 11.8965 20.7288 11.8965 20.4771C14.292 20.4771 16.6588 20.4771 19.0551 20.4771C19.0551 20.7237 19.0551 20.9424 19.0551 21.2016C16.6849 21.2016 14.3176 21.2016 11.8965 21.2016Z" fill="#000" stroke="#000" strokeWidth="1" />
                </svg>
            ),
            key: "subscriptionPage",
            activeLink: ['subscriptionPage'],
            onClickFunc: handleActiveWithOutDrop
        },
        {
            title: "Packages",
            to: "/allPackagesPage",
            icon: (
                <svg width="25" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.6797 28.2409C8.83891 28.2409 5.35076 26.0661 3.64845 22.6452C1.48957 20.729 0.254028 17.9911 0.254028 15.1035C0.254028 9.53545 4.76795 5.02153 10.3356 5.02153C14.1602 5.02153 17.6487 7.1857 19.3567 10.6051C21.5261 12.5243 22.7613 15.2585 22.7613 18.1589C22.7613 23.7266 18.2474 28.2409 12.6797 28.2409ZM15.771 5.30348C14.7554 5.30348 14.7554 3.75916 15.771 3.75916H22.7496C23.7651 3.75916 23.7651 5.30348 22.7496 5.30348H15.771ZM21.6728 25.7327C20.6572 25.7327 20.6572 24.1884 21.6728 24.1884H28.6514C29.6669 24.1884 29.6669 25.7327 28.6514 25.7327H21.6728ZM24.0059 18.9231C22.9903 18.9231 22.9903 17.3788 24.0059 17.3788H30.9845C32 17.3788 32 18.9231 30.9845 18.9231H24.0059ZM21.6728 12.1135C20.6572 12.1135 20.6572 10.5692 21.6728 10.5692H28.6514C29.6669 10.5692 29.6669 12.1135 28.6514 12.1135H21.6728ZM2.6155 18.7602C2.60378 18.5614 2.59773 18.3607 2.59773 18.1589C2.59773 12.5908 7.11166 8.07692 12.6797 8.07692C13.7898 8.07692 14.8579 8.25645 15.8568 8.58792C14.3102 7.27641 12.3683 6.56585 10.3356 6.56585C5.62062 6.56585 1.79798 10.3881 1.79798 15.1035C1.79798 16.3878 2.07237 17.598 2.6155 18.7602ZM17.6491 18.9311C16.6335 18.9311 16.6335 17.3867 17.6491 17.3867H19.046C20.0616 17.3867 20.0616 18.9311 19.046 18.9311H17.6491ZM6.31304 18.9311C5.29747 18.9311 5.29747 17.3867 6.31304 17.3867H7.70996C8.72553 17.3867 8.72553 18.9311 7.70996 18.9311H6.31304ZM11.9075 11.6834C11.9075 10.6678 13.4515 10.6678 13.4515 11.6834V12.3301C14.952 12.6868 16.025 14.0312 16.025 15.5858C16.025 16.6013 14.4807 16.6013 14.4807 15.5858C14.4807 14.5887 13.6764 13.7841 12.6793 13.7841C11.6827 13.7841 10.8784 14.5891 10.8784 15.5858C10.8784 16.5805 11.6849 17.3871 12.6793 17.3871C14.5268 17.3871 16.025 18.8849 16.025 20.7324C16.025 22.2869 14.952 23.6313 13.4515 23.9881V24.634C13.4515 25.6496 11.9075 25.6496 11.9075 24.634V23.9885C10.4108 23.6351 9.33404 22.2854 9.33404 20.7324C9.33404 19.7168 10.8784 19.7168 10.8784 20.7324C10.8784 21.7162 11.6868 22.547 12.6793 22.5337C13.6722 22.547 14.4807 21.7162 14.4807 20.7324C14.4807 19.7376 13.6741 18.9311 12.6793 18.9311C10.8323 18.9311 9.33404 17.4332 9.33404 15.5858C9.33404 14.0331 10.4108 12.6831 11.9075 12.3297V11.6834ZM12.6797 26.6965C17.3947 26.6965 21.2173 22.8739 21.2173 18.1589C21.2173 13.4435 17.3947 9.62125 12.6797 9.62125C7.96433 9.62125 4.14168 13.4435 4.14168 18.1589C4.14168 22.8743 7.96433 26.6965 12.6797 26.6965Z" fill="#000" strokeWidth="2" />
                </svg>
            ),
            key: "allPackagesPage",
            activeLink: ['allPackagesPage'],
            onClickFunc: handleActiveWithOutDrop
        },
        {
            title: "Request",
            to: "/requestPage",
            icon: <Icon icon="simple-line-icons:note" width="1.4em" height="1.5em" />,
            key: "requestPage",
            activeLink: ['requestPage'],
            onClickFunc: handleActiveWithOutDrop
        }
    ];

    const adminMenuItems = [
        {
            title: "Dashboard",
            to: "/",
            icon: <Icon icon="clarity:dashboard-line" width="1.5em" height="1.5em" />,
            key: "dashboard",
            activeLink: ['dashboard'],
            onClickFunc: handleActiveWithOutDrop
        },
        {
            title: "Users",
            to: "/admin",
            icon: <Icon icon="fa:user-o" width="1.5em" height="1.5em" />,
            key: "admin",
            hasDropdown: true,
            activeLink: ['admin', 'teacher', 'accountant', 'librarian', 'other_staff'],
            dropdownItems: [
                {
                    title: "Admin",
                    to: "/admin",
                    icon: <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />,
                    key: "admin",
                    onClickFunc: handleActiveWithOutDrop
                },
                {
                    title: "Teacher",
                    to: "/teacher",
                    icon: <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />,
                    key: "teacher",
                    onClickFunc: handleActiveWithOutDrop
                },
                {
                    title: "Accountant",
                    to: "/accountant",
                    icon: <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />,
                    key: "accountant",
                    onClickFunc: handleActiveWithOutDrop
                },
                {
                    title: "Librarian",
                    to: "/librarian",
                    icon: <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />,
                    key: "librarian",
                    onClickFunc: handleActiveWithOutDrop
                },
                {
                    title: "Other Staff",
                    to: "/other_staff",
                    icon: <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />,
                    key: "other_staff",
                    onClickFunc: handleActiveWithOutDrop
                }
            ],
            onClickFunc: handleActiveDropAndLink
        },
        {
            title: "Admissions",
            to: "/admissionForm",
            icon: <Icon icon="ri:id-card-line" width="1.5em" height="1.5em" />,
            key: "admissionForm",
            hasDropdown: true,
            activeLink: ['admissionForm', 'allStudent'],
            dropdownItems: [
                {
                    title: "Add Students",
                    to: "/admissionForm",
                    icon: <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />,
                    key: "admissionForm",
                    onClickFunc: handleActiveWithOutDrop
                },
                {
                    title: "All Students",
                    to: "/allStudent",
                    icon: <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />,
                    key: "allStudent",
                    onClickFunc: handleActiveWithOutDrop
                }
            ],
            onClickFunc: handleActiveDropAndLink
        },
        {
            title: "Transport",
            to: "/driver",
            icon: <Icon icon="fluent-mdl2:bus" width="1.5em" height="1.5em" />,
            key: "driver",
            hasDropdown: true,
            activeLink: ['driver', 'vehicle', 'route', 'dropPoint', 'assignStudent'],
            dropdownItems: [
                {
                    title: "Driver",
                    to: "/driver",
                    icon: <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />,
                    key: "driver",
                    onClickFunc: handleActiveWithOutDrop
                },
                {
                    title: "Vehicle",
                    to: "/vehicle",
                    icon: <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />,
                    key: "vehicle",
                    onClickFunc: handleActiveWithOutDrop
                },
                {
                    title: "Route",
                    to: "/route",
                    icon: <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />,
                    key: "route",
                    onClickFunc: handleActiveWithOutDrop
                },
                {
                    title: "Drop Point",
                    to: "/dropPoint",
                    icon: <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />,
                    key: "dropPoint",
                    onClickFunc: handleActiveWithOutDrop
                },
                {
                    title: "Assign Student",
                    to: "/assignStudent",
                    icon: <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />,
                    key: "assignStudent",
                    onClickFunc: handleActiveWithOutDrop
                }
            ],
            onClickFunc: handleActiveDropAndLink
        },
        {
            title: "Examination",
            to: "/examCategory",
            icon: <Icon icon="icon-park-outline:id-card-v" width="1.5em" height="1.5em" />,
            key: "examCategory",
            hasDropdown: true,
            activeLink: ['examCategory', 'offlineExam', 'marks', 'grades', 'marksheet', 'promotion'],
            dropdownItems: [
                {
                    title: "Exam Category",
                    to: "/examCategory",
                    icon: <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />,
                    key: "examCategory",
                    onClickFunc: handleActiveWithOutDrop
                },
                {
                    title: "Offline Exam",
                    to: "/offlineExam",
                    icon: <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />,
                    key: "offlineExam",
                    onClickFunc: handleActiveWithOutDrop
                },
                {
                    title: "Marks",
                    to: "/marks",
                    icon: <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />,
                    key: "marks",
                    onClickFunc: handleActiveWithOutDrop
                },
                {
                    title: "Grades",
                    to: "/grades",
                    icon: <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />,
                    key: "grades",
                    onClickFunc: handleActiveWithOutDrop
                },
                {
                    title: "Marksheet",
                    to: "/marksheet",
                    icon: <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />,
                    key: "marksheet",
                    onClickFunc: handleActiveWithOutDrop
                },
                {
                    title: "Promotion",
                    to: "/promotion",
                    icon: <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />,
                    key: "promotion",
                    onClickFunc: handleActiveWithOutDrop
                }
            ],
            onClickFunc: handleActiveDropAndLink
        },
        {
            title: "Academic",
            to: "/dailyattendance",
            icon: <Icon icon="ph:graduation-cap" width="1.5em" height="1.5em" />,
            key: "dailyattendance",
            hasDropdown: true,
            activeLink: ['dailyattendance', 'classlist', 'section', 'classroutine', 'subject', 'assignsubjectteacher', 'syllabus', 'Classroom', 'Department', 'assignclassteacher'],
            dropdownItems: [
                {
                    title: "Daily Attendance",
                    to: "/dailyattendance",
                    icon: <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />,
                    key: "dailyattendance",
                    onClickFunc: handleActiveWithOutDrop
                },
                {
                    title: "Class List",
                    to: "/classlist",
                    icon: <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />,
                    key: "classlist",
                    onClickFunc: handleActiveWithOutDrop
                },
                {
                    title: "Sections",
                    to: "/section",
                    icon: <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />,
                    key: "section",
                    onClickFunc: handleActiveWithOutDrop
                },
                {
                    title: "Class Routine",
                    to: "/classroutine",
                    icon: <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />,
                    key: "classroutine",
                    onClickFunc: handleActiveWithOutDrop
                },
                {
                    title: "Subject",
                    to: "/subject",
                    icon: <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />,
                    key: "subject",
                    onClickFunc: handleActiveWithOutDrop
                },
                {
                    title: "Assign Subject Teacher",
                    to: "/assignsubjectteacher",
                    icon: <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />,
                    key: "assignsubjectteacher",
                    onClickFunc: handleActiveWithOutDrop
                },
                {
                    title: "Syllabus",
                    to: "/syllabus",
                    icon: <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />,
                    key: "syllabus",
                    onClickFunc: handleActiveWithOutDrop
                },
                {
                    title: "Class Room",
                    to: "/Classroom",
                    icon: <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />,
                    key: "Classroom",
                    onClickFunc: handleActiveWithOutDrop
                },
                {
                    title: "Department",
                    to: "/Department",
                    icon: <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />,
                    key: "Department",
                    onClickFunc: handleActiveWithOutDrop
                },
                {
                    title: "Assign Class Teacher",
                    to: "/assignclassteacher",
                    icon: <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />,
                    key: "assignclassteacher",
                    onClickFunc: handleActiveWithOutDrop
                },
            ],
            onClickFunc: handleActiveDropAndLink
        },
        {
            title: "Accounting",
            to: "/discount",
            icon: <Icon icon="map:accounting" width="1.5em" height="1.5em" />,
            key: "discount",
            hasDropdown: true,
            activeLink: ['discount', 'fee', 'feecollection', 'manageinvoice', 'dueinvoisce', 'income', 'incomecategory', 'expense', 'expensecategory'],
            dropdownItems: [
                {
                    title: "Discount",
                    to: "/discount",
                    icon: <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />,
                    key: "discount",
                    onClickFunc: handleActiveWithOutDrop
                },
                {
                    title: "Fee Type",
                    to: "/fee",
                    icon: <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />,
                    key: "fee",
                    onClickFunc: handleActiveWithOutDrop
                },
                {
                    title: "Fee Collection",
                    to: "/feecollection",
                    icon: <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />,
                    key: "feecollection",
                    onClickFunc: handleActiveWithOutDrop
                },
                {
                    title: "Manage Invoice",
                    to: "/manageinvoice",
                    icon: <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />,
                    key: "manageinvoice",
                    onClickFunc: handleActiveWithOutDrop
                },
                {
                    title: "Due Invoice",
                    to: "/dueinvoisce",
                    icon: <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />,
                    key: "dueinvoisce",
                    onClickFunc: handleActiveWithOutDrop
                },
                {
                    title: "Income",
                    to: "/income",
                    icon: <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />,
                    key: "income",
                    onClickFunc: handleActiveWithOutDrop
                },
                {
                    title: "Income Category",
                    to: "/incomecategory",
                    icon: <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />,
                    key: "incomecategory",
                    onClickFunc: handleActiveWithOutDrop
                },
                {
                    title: "Expense",
                    to: "/expense",
                    icon: <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />,
                    key: "expense",
                    onClickFunc: handleActiveWithOutDrop
                },
                {
                    title: "Expense Category",
                    to: "/expensecategory",
                    icon: <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />,
                    key: "expensecategory",
                    onClickFunc: handleActiveWithOutDrop
                }
            ],
            onClickFunc: handleActiveDropAndLink
        },
        {
            title: "Sample Paper",
            to: "/samplepaper",
            icon: <Icon icon="fluent:document-bullet-list-24-regular" width="1.5em" height="1.5em" />,
            key: "samplepaper",
            activeLink: ['samplepaper'],
            onClickFunc: handleActiveWithOutDrop
        },
        {
            title: "Assignment",
            to: "/assignment",
            icon: <Icon icon="el:list-alt" width="1.5em" height="1.5em" />,
            key: "assignment",
            activeLink: ['assignment'],
            onClickFunc: handleActiveWithOutDrop
        },
        {
            title: "Human Resource",
            to: "/userrole",
            icon: <img src="./images/HR.svg" alt="" />,
            key: "userrole",
            hasDropdown: true,
            activeLink: ['userrole', 'takeattendance', 'leavestatus', 'assignleave', 'payroll'],
            dropdownItems: [
                {
                    title: "Role & Permission",
                    to: "/userrole",
                    icon: <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />,
                    key: "userrole",
                    onClickFunc: handleActiveWithOutDrop
                },
                {
                    title: "Take Attendance",
                    to: "/takeattendance",
                    icon: <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />,
                    key: "takeattendance",
                    onClickFunc: handleActiveWithOutDrop
                },
                {
                    title: "Leave Status",
                    to: "/leavestatus",
                    icon: <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />,
                    key: "leavestatus",
                    onClickFunc: handleActiveWithOutDrop
                },
                {
                    title: "Assign Leave",
                    to: "/assignleave",
                    icon: <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />,
                    key: "assignleave",
                    onClickFunc: handleActiveWithOutDrop
                },
                {
                    title: "Payroll",
                    to: "/payroll",
                    icon: <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />,
                    key: "payroll",
                    onClickFunc: handleActiveWithOutDrop
                },

            ],
            onClickFunc: handleActiveDropAndLink
        },
        {
            title: "Fee Collection",
            to: "/collectFees",
            icon: <Icon icon="mage:dashboard-2" width="1.5em" height="1.5em" />,
            key: "collectFees",
            hasDropdown: true,
            activeLink: ['collectFees', 'searchFeePayment', 'searchDueFees', 'feesMaster', 'feesGroup', 'feesType', 'feesDiscount'],
            dropdownItems: [
                {
                    title: "Collect Fees",
                    to: "/collectFees",
                    icon: <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />,
                    key: "collectFees",
                    onClickFunc: handleActiveWithOutDrop
                },
                {
                    title: "Search Fee Payment",
                    to: "/searchFeePayment",
                    icon: <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />,
                    key: "searchFeePayment",
                    onClickFunc: handleActiveWithOutDrop
                },
                {
                    title: "Search Due Fees",
                    to: "/searchDueFees",
                    icon: <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />,
                    key: "searchDueFees",
                    onClickFunc: handleActiveWithOutDrop
                },
                {
                    title: "Fees Master",
                    to: "/feesMaster",
                    icon: <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />,
                    key: "feesMaster",
                    onClickFunc: handleActiveWithOutDrop
                },
                {
                    title: "Fees Group",
                    to: "/feesGroup",
                    icon: <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />,
                    key: "feesGroup",
                    onClickFunc: handleActiveWithOutDrop
                },
                {
                    title: "Fees Type",
                    to: "/feesType",
                    icon: <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />,
                    key: "feesType",
                    onClickFunc: handleActiveWithOutDrop
                },
                {
                    title: "Fees Discount",
                    to: "/feesDiscount",
                    icon: <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />,
                    key: "feesDiscount",
                    onClickFunc: handleActiveWithOutDrop
                },
            ],
            onClickFunc: handleActiveDropAndLink
        },
        {
            title: "Inventory",
            to: "/issueItem",
            icon: <Icon icon="mage:dashboard-2" width="1.5em" height="1.5em" />,
            key: "issueItem",
            hasDropdown: true,
            activeLink: ['issueItem', 'addItemStock', 'addItem', 'itemCategory', 'itemStore', 'itemSupplier'],
            dropdownItems: [
                {
                    title: "Issue Item",
                    to: "/issueItem",
                    icon: <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />,
                    key: "issueItem",
                    onClickFunc: handleActiveWithOutDrop
                },
                {
                    title: "Add Item Stock",
                    to: "/addItemStock",
                    icon: <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />,
                    key: "addItemStock",
                    onClickFunc: handleActiveWithOutDrop
                },
                {
                    title: "Add Item",
                    to: "/addItem",
                    icon: <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />,
                    key: "addItem",
                    onClickFunc: handleActiveWithOutDrop
                },
                {
                    title: "Item Category",
                    to: "/itemCategory",
                    icon: <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />,
                    key: "itemCategory",
                    onClickFunc: handleActiveWithOutDrop
                },
                {
                    title: "Item Store",
                    to: "/itemStore",
                    icon: <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />,
                    key: "itemStore",
                    onClickFunc: handleActiveWithOutDrop
                },
                {
                    title: "Item Supplier",
                    to: "/itemSupplier",
                    icon: <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />,
                    key: "itemSupplier",
                    onClickFunc: handleActiveWithOutDrop
                },
            ],
            onClickFunc: handleActiveDropAndLink
        },
        {
            title: "Holiday",
            to: "/holiday",
            icon: <img src="./images/holiday.svg" alt="" />,
            key: "holiday",
            activeLink: ['holiday'],
            onClickFunc: handleActiveWithOutDrop
        },
        {
            title: "Notice",
            to: "/notice",
            icon: <Icon icon="line-md:bell" width="1.5em" height="1.5em" />,
            key: "notice",
            activeLink: ['notice'],
            onClickFunc: handleActiveWithOutDrop
        },
        {
            title: "Event",
            to: "/event",
            icon: <Icon icon="ic:round-event" width="1.5em" height="1.5em" />,
            key: "event",
            activeLink: ['event'],
            onClickFunc: handleActiveWithOutDrop
        },
        {
            title: "Online Course",
            to: "/onlinecourse",
            icon: <img src="./images/webinar.svg" alt="" />,
            key: "onlinecourse",
            activeLink: ['onlinecourse'],
            onClickFunc: handleActiveWithOutDrop
        },
        {
            title: "Library",
            to: "/booklistmanager",
            icon: <Icon icon="cil:library-building" width="1.5em" height="1.5em" />,
            key: "booklistmanager",
            hasDropdown: true,
            activeLink: ['booklistmanager', 'bookissuereport'],
            dropdownItems: [
                {
                    title: "Book List Manager",
                    to: "/booklistmanager",
                    icon: <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />,
                    key: "booklistmanager",
                    onClickFunc: handleActiveWithOutDrop
                },
                {
                    title: "Book Issue Report",
                    to: "/bookissuereport",
                    icon: <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />,
                    key: "bookissuereport",
                    onClickFunc: handleActiveWithOutDrop
                }
            ],
            onClickFunc: handleActiveDropAndLink
        },
        {
            title: "Settings",
            to: "/schoolSetting",
            icon: <Icon icon="solar:settings-outline" width="1.5em" height="1.5em" />,
            key: "schoolSetting",
            hasDropdown: true,
            activeLink: ['schoolSetting', 'sessionManager', 'paymentSettings', 'subscription', 'myAccount'],
            dropdownItems: [
                {
                    title: "School Setting",
                    to: "/schoolSetting",
                    icon: <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />,
                    key: "schoolSetting",
                    onClickFunc: handleActiveWithOutDrop
                },
                {
                    title: "Session Manager",
                    to: "/sessionManager",
                    icon: <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />,
                    key: "sessionManager",
                    onClickFunc: handleActiveWithOutDrop
                },
                {
                    title: "Payment Settings",
                    to: "/paymentSettings",
                    icon: <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />,
                    key: "paymentSettings",
                    onClickFunc: handleActiveWithOutDrop
                },
                {
                    title: "Subscription",
                    to: "/subscription",
                    icon: <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />,
                    key: "subscription",
                    onClickFunc: handleActiveWithOutDrop
                },
                {
                    title: "My Account",
                    to: "/myAccount",
                    icon: <Icon icon="radix-icons:dash" width="1.5em" height="1.5em" />,
                    key: "myAccount",
                    onClickFunc: handleActiveWithOutDrop
                },
            ],
            onClickFunc: handleActiveDropAndLink
        },
    ];

    const parentMenuItems = [
        {
            title: "Dashboard",
            to: "/",
            icon: <Icon icon="clarity:dashboard-line" width="1.5em" height="1.5em" />,
            key: "dashboard",
            activeLink: ['dashboard'],
            onClickFunc: handleActiveWithOutDrop
        },
        {
            title: "Fees",
            to: "/Fees_P",
            icon: <Icon icon="ph:graduation-cap" width="1.5em" height="1.5em" />,
            key: "Fees_P",
            activeLink: ['Fees_P'],
            onClickFunc: handleActiveWithOutDrop
        },
        {
            title: "Examination",
            to: "/offlineExam_P",
            icon: <Icon icon="mage:dashboard-2" width="1.5em" height="1.5em" />,
            key: "offlineExam_P",
            hasDropdown: true,
            activeLink: ['offlineExam_P', 'marks_P', 'grades_P'],
            dropdownItems: [
                { title: "Offline Exams", to: "/offlineExam_P", icon: <Icon icon="mage:dashboard-2" width="1.5em" height="1.5em" />, key: "offlineExam_P", onClickFunc: handleActiveWithOutDrop },
                { title: "Marks", to: "/marks_P", icon: <Icon icon="fluent:note-add-48-regular" width="1.5em" height="1.5em" />, key: "marks_P", onClickFunc: handleActiveWithOutDrop },
                { title: "Grades", to: "/grades_P", icon: <Icon icon="fluent:note-add-48-regular" width="1.5em" height="1.5em" />, key: "grades_P", onClickFunc: handleActiveWithOutDrop }
            ],
            onClickFunc: handleActiveDropAndLink
        },
        {
            title: "Teacher",
            to: "/teacher_P",
            icon: <Icon icon="bx:book-add" width="1.5em" height="1.5em" />,
            key: "teacher_P",
            activeLink: ['teacher_P'],
            onClickFunc: handleActiveWithOutDrop
        },
        {
            title: "Assignments",
            to: "/Assignments_P",
            icon: <Icon icon="bx:book-add" width="1.5em" height="1.5em" />,
            key: "Assignments_P",
            activeLink: ['Assignments_P'],
            onClickFunc: handleActiveWithOutDrop
        },
        {
            title: "Online Course",
            to: "/OnlineCourse_P",
            icon: <Icon icon="bx:book-add" width="1.5em" height="1.5em" />,
            key: "OnlineCourse_P",
            activeLink: ['OnlineCourse_P'],
            onClickFunc: handleActiveWithOutDrop
        },
        {
            title: "Sample Paper",
            to: "/SamplePaper_P",
            icon: <Icon icon="bx:book-add" width="1.5em" height="1.5em" />,
            key: "SamplePaper_P",
            activeLink: ['SamplePaper_P'],
            onClickFunc: handleActiveWithOutDrop
        },
        {
            title: "Holiday",
            to: "/Holiday_P",
            icon: <Icon icon="bx:book-add" width="1.5em" height="1.5em" />,
            key: "Holiday_P",
            activeLink: ['Holiday_P'],
            onClickFunc: handleActiveWithOutDrop
        },
        {
            title: "Notice",
            to: "/Notice_P",
            icon: <Icon icon="bx:book-add" width="1.5em" height="1.5em" />,
            key: "Notice_P",
            activeLink: ['Notice_P'],
            onClickFunc: handleActiveWithOutDrop
        },
        {
            title: "Event",
            to: "/Event_P",
            icon: <Icon icon="bx:book-add" width="1.5em" height="1.5em" />,
            key: "Event_P",
            activeLink: ['Event_P'],
            onClickFunc: handleActiveWithOutDrop
        },
        {
            title: "Profile",
            to: "/Profile",
            icon: <Icon icon="bx:book-add" width="1.5em" height="1.5em" />,
            key: "Profile",
            activeLink: ['Profile'],
            onClickFunc: handleActiveWithOutDrop
        },
    ];

    const studentMenuItems = [
        {
            title: "Dashboard",
            to: "/",
            icon: <Icon icon="clarity:dashboard-line" width="1.5em" height="1.5em" />,
            key: "dashboard",
            activeLink: ['dashboard'],
            onClickFunc: handleActiveWithOutDrop
        },
        {
            title: "Academic",
            to: "/DailyAttendance_S",
            icon: <Icon icon="mage:dashboard-2" width="1.5em" height="1.5em" />,
            key: "DailyAttendance_S",
            hasDropdown: true,
            activeLink: ['DailyAttendance_S', 'ClassRoutines_S', 'Subject_S'],
            dropdownItems: [
                { title: "Daily Attendance", to: "/DailyAttendance_S", icon: <Icon icon="mage:dashboard-2" width="1.5em" height="1.5em" />, key: "DailyAttendance_S", onClickFunc: handleActiveWithOutDrop },
                { title: "Class Routines", to: "/ClassRoutines_S", icon: <Icon icon="fluent:note-add-48-regular" width="1.5em" height="1.5em" />, key: "ClassRoutines_S", onClickFunc: handleActiveWithOutDrop },
                { title: "Subject", to: "/Subject_S", icon: <Icon icon="fluent:note-add-48-regular" width="1.5em" height="1.5em" />, key: "Subject_S", onClickFunc: handleActiveWithOutDrop }
            ],
            onClickFunc: handleActiveDropAndLink
        },
        {
            title: "Examination",
            to: "/offlineExam_P",
            icon: <Icon icon="mage:dashboard-2" width="1.5em" height="1.5em" />,
            key: "offlineExam_P",
            hasDropdown: true,
            activeLink: ['offlineExam_P', 'marks_P', 'grades_P'],
            dropdownItems: [
                { title: "Offline Exams", to: "/offlineExam_P", icon: <Icon icon="mage:dashboard-2" width="1.5em" height="1.5em" />, key: "offlineExam_P", onClickFunc: handleActiveWithOutDrop },
                { title: "Marks", to: "/marks_P", icon: <Icon icon="fluent:note-add-48-regular" width="1.5em" height="1.5em" />, key: "marks_P", onClickFunc: handleActiveWithOutDrop },
                { title: "Grades", to: "/grades_P", icon: <Icon icon="fluent:note-add-48-regular" width="1.5em" height="1.5em" />, key: "grades_P", onClickFunc: handleActiveWithOutDrop }
            ],
            onClickFunc: handleActiveDropAndLink
        },
        {
            title: "Teacher",
            to: "/teacher_P",
            icon: <Icon icon="bx:book-add" width="1.5em" height="1.5em" />,
            key: "teacher_P",
            activeLink: ['teacher_P'],
            onClickFunc: handleActiveWithOutDrop
        },
        {
            title: "Assignments",
            to: "/Assignments_P",
            icon: <Icon icon="bx:book-add" width="1.5em" height="1.5em" />,
            key: "Assignments_P",
            activeLink: ['Assignments_P'],
            onClickFunc: handleActiveWithOutDrop
        },
        {
            title: "Online Course",
            to: "/OnlineCourse_P",
            icon: <Icon icon="bx:book-add" width="1.5em" height="1.5em" />,
            key: "OnlineCourse_P",
            activeLink: ['OnlineCourse_P'],
            onClickFunc: handleActiveWithOutDrop
        },
        {
            title: "Sample Paper",
            to: "/SamplePaper_P",
            icon: <Icon icon="bx:book-add" width="1.5em" height="1.5em" />,
            key: "SamplePaper_P",
            activeLink: ['SamplePaper_P'],
            onClickFunc: handleActiveWithOutDrop
        },
        {
            title: "Holiday",
            to: "/Holiday_P",
            icon: <Icon icon="bx:book-add" width="1.5em" height="1.5em" />,
            key: "Holiday_P",
            activeLink: ['Holiday_P'],
            onClickFunc: handleActiveWithOutDrop
        },
        {
            title: "Notice",
            to: "/Notice_P",
            icon: <Icon icon="bx:book-add" width="1.5em" height="1.5em" />,
            key: "Notice_P",
            activeLink: ['Notice_P'],
            onClickFunc: handleActiveWithOutDrop
        },
        {
            title: "Event",
            to: "/Event_P",
            icon: <Icon icon="bx:book-add" width="1.5em" height="1.5em" />,
            key: "Event_P",
            activeLink: ['Event_P'],
            onClickFunc: handleActiveWithOutDrop
        },
        {
            title: "Profile",
            to: "/Profile_S",
            icon: <Icon icon="bx:book-add" width="1.5em" height="1.5em" />,
            key: "Profile_S",
            activeLink: ['Profile_S'],
            onClickFunc: handleActiveWithOutDrop
        },
    ];

    const TeacherMenuItems = [
        {
            title: "Dashboard",
            to: "/",
            icon: <Icon icon="clarity:dashboard-line" width="1.5em" height="1.5em" />,
            key: "dashboard",
            activeLink: ['dashboard'],
            onClickFunc: handleActiveWithOutDrop
        },
        {
            title: "Academic",
            to: "/dailyattendance_T",
            icon: <Icon icon="mage:dashboard-2" width="1.5em" height="1.5em" />,
            key: "dailyattendance_T",
            hasDropdown: true,
            activeLink: ['dailyattendance_T', 'classroutine_T'],
            dropdownItems: [
                { title: "Daily Attendance", to: "/dailyattendance_T", icon: <Icon icon="mage:dashboard-2" width="1.5em" height="1.5em" />, key: "dailyattendance_T", onClickFunc: handleActiveWithOutDrop },
                { title: "Class Routines", to: "/classroutine_T", icon: <Icon icon="fluent:note-add-48-regular" width="1.5em" height="1.5em" />, key: "classroutine_T", onClickFunc: handleActiveWithOutDrop },
            ],
            onClickFunc: handleActiveDropAndLink
        },
        {
            title: "Examination",
            to: "/offlineexam_T",
            icon: <Icon icon="mage:dashboard-2" width="1.5em" height="1.5em" />,
            key: "offlineexam_T",
            hasDropdown: true,
            activeLink: ['offlineexam_T', 'marks_T'],
            dropdownItems: [
                { title: "Offline Exams", to: "/offlineexam_T", icon: <Icon icon="mage:dashboard-2" width="1.5em" height="1.5em" />, key: "offlineexam_T", onClickFunc: handleActiveWithOutDrop },
                { title: "Marks", to: "/marks_T", icon: <Icon icon="fluent:note-add-48-regular" width="1.5em" height="1.5em" />, key: "marks_T", onClickFunc: handleActiveWithOutDrop },
            ],
            onClickFunc: handleActiveDropAndLink
        },
        {
            title: "Human Resource",
            to: "/assignleave_T",
            icon: <Icon icon="mage:dashboard-2" width="1.5em" height="1.5em" />,
            key: "assignleave_T",
            hasDropdown: true,
            activeLink: ['assignleave_T', 'leave_T', 'payroll_T'],
            dropdownItems: [
                { title: "Attendance Report", to: "/assignleave_T", icon: <Icon icon="mage:dashboard-2" width="1.5em" height="1.5em" />, key: "assignleave_T", onClickFunc: handleActiveWithOutDrop },
                { title: "Leave", to: "/leave_T", icon: <Icon icon="fluent:note-add-48-regular" width="1.5em" height="1.5em" />, key: "leave_T", onClickFunc: handleActiveWithOutDrop },
                { title: "Payroll", to: "/payroll_T", icon: <Icon icon="fluent:note-add-48-regular" width="1.5em" height="1.5em" />, key: "payroll_T", onClickFunc: handleActiveWithOutDrop },
            ],
            onClickFunc: handleActiveDropAndLink
        },
        {
            title: "Assignments",
            to: "/assignmenttea_T",
            icon: <Icon icon="bx:book-add" width="1.5em" height="1.5em" />,
            key: "assignmenttea_T",
            activeLink: ['assignmenttea_T'],
            onClickFunc: handleActiveWithOutDrop
        },
        {
            title: "Online Course",
            to: "/onlinecourse_T",
            icon: <Icon icon="bx:book-add" width="1.5em" height="1.5em" />,
            key: "onlinecourse_T",
            activeLink: ['onlinecourse_T'],
            onClickFunc: handleActiveWithOutDrop
        },
        {
            title: "Sample Paper",
            to: "/samplepaper_T",
            icon: <Icon icon="bx:book-add" width="1.5em" height="1.5em" />,
            key: "samplepaper_T",
            activeLink: ['samplepaper_T'],
            onClickFunc: handleActiveWithOutDrop
        },
        {
            title: "Holiday",
            to: "/holiday_T",
            icon: <Icon icon="bx:book-add" width="1.5em" height="1.5em" />,
            key: "holiday_T",
            activeLink: ['holiday_T'],
            onClickFunc: handleActiveWithOutDrop
        },
        {
            title: "Notice",
            to: "/notice_T",
            icon: <Icon icon="bx:book-add" width="1.5em" height="1.5em" />,
            key: "notice_T",
            activeLink: ['notice_T'],
            onClickFunc: handleActiveWithOutDrop
        },
        {
            title: "Event",
            to: "/event_T",
            icon: <Icon icon="bx:book-add" width="1.5em" height="1.5em" />,
            key: "event_T",
            activeLink: ['event_T'],
            onClickFunc: handleActiveWithOutDrop
        },
        {
            title: "Profile",
            to: "/profile_T",
            icon: <Icon icon="bx:book-add" width="1.5em" height="1.5em" />,
            key: "profile_T",
            activeLink: ['profile_T'],
            onClickFunc: handleActiveWithOutDrop
        },

    ];

    const menuItems = role === 'SUPERADMIN' ? superAdminMenuItems : role === 'ADMIN' ? adminMenuItems : role === 'PARENT' ? parentMenuItems : role === 'STUDENT' ? studentMenuItems : role === 'USER' ? TeacherMenuItems : ''; 



    return (
        <Container sidebarOpen={sidebarOpen}>
            <div className="container-fluid">
                <div className="row sticky-top">
                    <StickyHeader className="borderBottom">
                        <div className={` ${sidebarOpen ? "p-2" : "pt-3 pb-4"} text-white d-flex justify-content-center align-self-center`}>
                            <img className={` sidebarclass {sidebarOpen ? "p-0" : "pt-4 pb-4"}`} src={sidebarOpen ? "./images/Scrizalogo.svg" : "./images/ScrizaSmallLogo.png"} alt="sidebarLogo" style={{ transition: 'opacity 0.3s ease' }} />
                            <Icon className='toggle-icon' icon="emojione:left-arrow" width="1.7em" height="1.7em" onClick={toggleSidebar} />
                        </div>
                    </StickyHeader>
                </div>
                <div className="row overflow-scroll">
                    <ul className='p-0'>
                        {menuItems?.map(item => (
                            <li key={item.key}>
                                <Link
                                    to={item.to}
                                    className={`menus p-2 d-flex borderBottom ${sidebarOpen === '' ? 'justify-content-center' : ''} ${item.activeLink.includes(activeLink) ? 'active' : ''}`}
                                    // onClick={() => item.hasDropdown ? handleActiveDropAndLink(item.key) : handleActiveWithOutDrop()}
                                    onClick={() => item.onClickFunc(item.key)}
                                    data-bs-toggle={item.hasDropdown ? "collapse" : ""}
                                    data-bs-target={item.hasDropdown ? `#collapse-${item.key}` : ""}
                                >
                                    {item.icon}
                                    <h3 className="menu-text flex-grow-1">{item.title}</h3>
                                    {item.hasDropdown && (
                                        <div>
                                            {activeDropdowns[item.key] ? (
                                                <Icon icon="ri:arrow-up-s-fill" width="1.5em" height="1.5em" />
                                            ) : (
                                                <Icon icon="ri:arrow-down-s-fill" width="1.5em" height="1.5em" />
                                            )}
                                        </div>
                                    )}
                                </Link>

                                {item.hasDropdown && (
                                    <div id={`collapse-${item.key}`} className={`collapse collapse-menu p-0 ${activeDropdowns[item.key] ? 'show' : ''}`}>
                                        <ul className='list-unstyled p-0 bg-white'>
                                            {item.dropdownItems.map(subItem => (
                                                <li key={subItem.key}>
                                                    <Link
                                                        to={subItem.to}
                                                        className={`menus p-2 d-flex borderBottom ${sidebarOpen === '' ? 'justify-content-center' : ''} ${activeLink === subItem.key ? 'active' : ''}`}
                                                        onClick={() => {
                                                            subItem.onClickFunc(subItem.key);
                                                            handleActiveLink(subItem.key);
                                                        }}
                                                    >
                                                        {subItem.icon}
                                                        <h3 className="menu-text">{subItem.title}</h3>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </li>
                        ))}
                        <li>
                            <Link className={`menus p-2 d-flex borderBottom ${sidebarOpen === '' ? 'justify-content-center' : ''} ${activeLink === 'logout' ? 'active' : ''}`} onClick={() => handleActiveWithOutDrop('logout')} data-bs-toggle="offcanvas" data-bs-target="#logoutCanvas" aria-controls="logoutCanvas" >
                                <Icon icon="material-symbols:logout" width="1.5em" height="1.5em" />
                                <h3 className="menu-text">Logout</h3>
                            </Link>
                        </li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
            </div>


            {/* Logout */}

            <div className="offcanvas offcanvas-end p-2" data-bs-backdrop="static" tabIndex="-1" id="logoutCanvas" aria-labelledby="staticBackdropLabel">
                <div className="offcanvas-header ps-0 modalHighborder p-1">
                    <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
                        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                            <path fill="#B50000" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                        </svg>
                    </Link>
                    <h2 className="offcanvas-title fontWeight900" id="staticBackdropLabel">Logout Message</h2>
                </div>
                <div className="offcanvas-body p-0">
                    {LogoutSuccess
                        ?
                        <>
                            <div>
                                <p className='border-bottom p-2'>Logout</p>
                                <div className="text-center p-5">
                                    <p className='mb-2'><img src="./images/logout.svg" alt="" /></p>
                                    <h1 className='mb-2'>Are you Sure?</h1>
                                    <h3 className='greyText'>Are you Sure you want to logout?</h3>
                                    <p className='text-center p-3'>
                                        <button className='btn deleteButtons text-white' onClick={handleUserLogout}>Logout</button>
                                        <button className='btn cancelButtons ms-3' data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
                                    </p>
                                </div>
                            </div>
                        </>
                        :
                        <>
                            <div>
                                <p className='modalLightBorder p-2 mb-0'>Logout</p>
                                <div className="mt-3">
                                    <div className='correvtSVG p-3 pt-4 rounded-circle'><img src="./images/Correct.svg" alt="" /></div>
                                    <div className="updatetext border m-4 border-2  ms-5 greydiv rounded-3 text-center greyText p-5">
                                        <p className='warningHeading'>Successful Updated</p>
                                        <p className='greyText warningText pt-2'>Your Changes has been<br />Successfully Saved</p>
                                    </div>
                                    <button className='btn contbtn continueButtons text-white' type='button' data-bs-dismiss="offcanvas" aria-label="Close" >Continue</button>
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>

        </Container>
    );
};

export default Sidebar;
