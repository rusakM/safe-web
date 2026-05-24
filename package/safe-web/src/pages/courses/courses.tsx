import React from 'react';
import { useTranslate } from '@tolgee/react';

import PageContainer from '../../page-components/page-container/page-container';
import PrimaryContainer from '../../components/primary-container/primary-container';

import { useDeviceType } from '../../helpers/responsiveContainers';

import styles from "./courses.module.scss";
import commonStyles from "../../styles/common.module.scss";
import containersStyles from "../../styles/containers.module.scss";
import landingPageStyles from "../landing-page/landing-page.module.scss";

import ImgTop from "../../assets/landing-page/teacher_books1.svg";
import FakeNews from '../../assets/courses/fake_news.svg';
import Cyberbullying from '../../assets/courses/cyberbullying.svg';
import InternetScam from '../../assets/courses/internet_scam.svg';
import OnlineThreats1 from '../../assets/courses/online_threats1.svg';
import OnlineThreats2 from '../../assets/courses/online_threats2.svg';
import WebSecurely from '../../assets/courses/web_securely.svg';
import HistoryCybersecurity from '../../assets/courses/history_cybersecurity.svg';
import CourseCard from '../../components/course-card/course-card';

type TCourse = {img: string, name: string};
const courses: TCourse[] = [
	{
		img: FakeNews,
		name: "fake-news"
	},
	{
		img: Cyberbullying,
		name: "cyberbullying"
	},
	{
		img: InternetScam,
		name: "internet-scam"
	},
	{
		img: OnlineThreats1,
		name: "online-threats1",
	},
	{
		img: OnlineThreats2,
		name: "online-threats2"
	},
	{
		img: WebSecurely,
		name: "web-securely",
	},
	{
		img: HistoryCybersecurity,
		name: "history-cybersecurity"
	}
];

const Materials: React.FC = () => {
	const { t } = useTranslate();
	const { isMobile } = useDeviceType();


 
	return (
		<PageContainer>
			<PrimaryContainer direction="column" additionalClassess={commonStyles.padding1em}>
				<PrimaryContainer
				direction={isMobile ? "column" : "rowReverse"}
				additionalClassess={`${containersStyles.pagePadding}`}
				width="desktopFit"
				contentJustify={isMobile ? "center" : "right"}
			>
				<PrimaryContainer additionalClassess={!isMobile ? containersStyles.halfScreenContainer : ""}>
					<img alt="For teachers" src={ImgTop} className={landingPageStyles.landingPageImg} />
				</PrimaryContainer>
				<PrimaryContainer direction="column" contentJustify="left" contentAlignment="left" additionalClassess={!isMobile ? `${containersStyles.halfScreenContainer}` : ""} >
					<p className={`${commonStyles.basicHeader2} ${commonStyles.noPadding}`}>
						{t("manuals.header")}
					</p>
					<p className={`${commonStyles.basicText}`}>
						{"Lorem ipsum dolor sit amet consectetur. Molestie mauris integer amet fringilla proin ac. A est quis quis aliquet et placerat nulla. Fermentum mi semper gravida ultrices risus. Porttitor id elementum enim elit lobortis in neque viverra. Dolor eget viverra velit scelerisque vulputate.Lorem ipsum dolor sit amet consectetur. Molestie mauris integer amet fringilla proin ac. A est quis quis aliquet et placerat nulla. Fermentum mi semper gravida ultrices risus. Porttitor id elementum enim elit lobortis in neque viverra. Dolor eget viverra velit scelerisque vulputate."}
					</p>
				</PrimaryContainer>
			</PrimaryContainer>
			<PrimaryContainer direction="column" additionalClassess={`${styles.materialsContainer} ${commonStyles.basicGap}`} width="desktopFit">
				{
					courses.map((course, index) => (
						<CourseCard
							key={`course-${course.name}-${index}`}
							header={t(`landing-page.carousel.${course.name}`)}
							description={t(`landing-page.carousel.${course.name}.description`)}
							picture={course.img}
							start={() => console.log(`Start course ${course.name}`)}
							status="not-started"
						/>
					))
				}
			</PrimaryContainer> 
			</PrimaryContainer>
			
		</PageContainer>
	);
};
 
export default Materials;
 