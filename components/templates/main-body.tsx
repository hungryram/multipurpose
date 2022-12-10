import Hero from './hero'
import FeaturedGrid from './featured-grid'
import Banner from './banner'
import DisclosureSection from './disclosure'
import FullWidthTextImage from './full-width-text-image'
import TextImage from './text-and-image'
import Gallery from './gallery'
import Testimonials from './testimonials'
import Pricing from './pricing'
import LeadForm from './lead-form'
import TeamSection from './team-section'
import BlogSection from './blog-section'
import IconSection from './icon-section'
import ServiceSection from './service-section'
import ContactPage from './contact'
import Logos from './logos'

export default function MainBody({
    pageBuilder,
    // CONTACT
    email,
    phone_number,
    address,
    city,
    state,
    zip_code,
    emailAlerts,
    sendFrom,
    emailBcc,
    emailCc,
    // SOCIAL
    facebook,
    youtube,
    instagram,
    twitter,
    reddit,
    linkedin,
    yelp,
    pinterest,
    tiktok,
    zillow,
    size,
    // HOURS
    monday, tuesday, wednesday, thursday, friday, saturday, sunday,
    // PAGE FOLDERS
    allServices,
    allTestimonial,
    allBlog,
    allTeam
}: any) {

    const defaultText = 'var(--website-text-color)'
    const defaultHeader = 'var(--website-text-color)'


    return (
        <>
            {pageBuilder?.map((section) => {

                const headerColor = {
                    color: section?.background?.textColor?.headerColor?.hex ?? defaultHeader
                }
                const bodyColor = {
                    color: section?.background?.textColor?.textColor?.hex ?? defaultText
                }

                const backgroundStyles = {
                    backgroundColor: `${section.background?.background?.backgroundType === 'color' &&
                        section?.background?.background?.color?.hex}`,
                    backgroundImage: `${section.background?.background?.backgroundType === 'image' &&
                        `linear-gradient(rgba(
                            ${section?.background?.background?.imageOverlayColor?.rgb.r ?? '0'}, 
                            ${section?.background?.background?.imageOverlayColor?.rgb.g ?? '0'}, 
                            ${section?.background?.background?.imageOverlayColor?.rgb.b ?? '0'}, 
                            ${section?.background?.background?.imageOverlayColor?.rgb.a ?? '0.2'}), 
                            rgba(
                            ${section?.background?.background?.imageOverlayColor?.rgb.r ?? '0'}, 
                            ${section?.background?.background?.imageOverlayColor?.rgb.g ?? '0'}, 
                            ${section?.background?.background?.imageOverlayColor?.rgb.b ?? '0'}, 
                            ${section?.background?.background?.imageOverlayColor?.rgb.a ?? '0.2'})), 
                            url(${section.backgroundImage?.image?.asset?.url})`}`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }

                const secondaryBackground = {
                    backgroundColor: `rgba(
                    ${section?.secondaryBackground?.rgb.r}, 
                    ${section?.secondaryBackground?.rgb.g}, 
                    ${section?.secondaryBackground?.rgb.b}, 
                    ${section?.secondaryBackground?.rgb.a})`
                }

                const primaryButton = {
                    backgroundColor: `rgba(
                        ${section?.button?.buttonBackground?.rgb.r}, 
                        ${section?.button?.buttonBackground?.rgb.g}, 
                        ${section?.button?.buttonBackground?.rgb.b}, 
                        ${section?.button?.buttonBackground?.rgb.a})`,
                    color: `${section?.button?.buttonTextColor?.hex}`,
                    border: `1px solid ${section?.button?.buttonBorderColor?.hex}`
                }

                const secondaryButton = {
                    backgroundColor: `rgba(
                        ${section?.secondaryButton?.buttonBackground?.rgb.r}, 
                        ${section?.secondaryButton?.buttonBackground?.rgb.g}, 
                        ${section?.secondaryButton?.buttonBackground?.rgb.b}, 
                        ${section?.secondaryButton?.buttonBackground?.rgb.a})`,
                    color: `${section?.secondaryButton?.buttonTextColor?.hex}`,
                    border: `1px solid ${section?.secondaryButton?.buttonBorderColor?.hex}`
                }



                if (section._type === 'hero') {
                    return (
                        <Hero
                            key={section._key}
                            body={section?.content}
                            altText={section?.imageData?.asset?.altText}
                            textStyle={section?.textColor?.textColor?.hex}
                            image={section?.image}
                            blurData={section?.imageData?.asset?.lqip}
                            buttonLink={section?.buttonLinking}
                            buttonText={section?.buttonLinking?.buttonText}
                            buttonStyle={primaryButton}
                            imageHeight={
                                section?.imageHeight === 'small' && 'py-48 lg:py-48' ||
                                section?.imageHeight === 'medium' && 'py-48 lg:py-60' ||
                                section?.imageHeight === 'large' && 'h-screen'
                            }
                            // SECONDARY BUTTON
                            secondButtonText={section?.secondButtonLinking?.buttonText}
                            secondButtonLink={section?.secondButtonLinking}
                            secondaryButtonStyle={secondaryButton}
                        />
                    )
                }

                if (section._type === 'textandImage') {
                    return (
                        <TextImage
                            key={section._key}
                            heading={section?.heading}
                            content={section?.content}
                            image={section?.imageData?.asset?.url}
                            imageWidth={section?.image?.imageWidth}
                            blurData={section?.imageData?.asset?.lqip}
                            buttonLink={section?.buttonLinking}
                            buttonText={section?.buttonLinking?.buttonText}
                            buttonStyle={primaryButton}
                            altText={section?.imageData?.asset?.altText}
                            rowReverse={section?.reverseRow}
                            removeShadow={section?.removeShadow}
                            headerStyle={headerColor}
                            textStyle={bodyColor}
                            textLeft={section?.textLeft}
                            twoColumnText={section?.twoColumnText}
                            backgroundStyles={backgroundStyles}
                            removePadding={section?.removePadding}
                            // SECONDARY BUTTON
                            secondButtonText={section?.secondButtonLinking?.buttonText}
                            secondButtonLink={section?.secondButtonLinking}
                            secondaryButtonStyle={secondaryButton}
                        />
                    )
                }

                if (section._type === 'banner') {
                    return (
                        <Banner
                            key={section._key}
                            heading={section.heading}
                            content={section?.content}
                            backgroundStyles={backgroundStyles}
                            headerStyle={headerColor}
                            textStyle={bodyColor}
                            fullWidth={section?.fullWidth}
                            removePadding={section?.removePadding}
                            buttonText={section?.buttonLinking?.buttonText}
                            buttonLink={section?.buttonLinking}
                            buttonStyle={primaryButton}
                            twoColumn={section?.twoColumn}
                            // SECONDARY BUTTON
                            secondButtonText={section?.secondButtonLinking?.buttonText}
                            secondButtonLink={section?.secondButtonLinking}
                            secondaryButtonStyle={secondaryButton}
                        />
                    )
                }

                if (section._type === 'fullWidthTextImage') {
                    return (
                        <FullWidthTextImage
                            key={section._key}
                            heading={section?.heading}
                            altText={section?.altText}
                            content={section?.content}
                            image={section?.image}
                            buttonText={section?.buttonLinking?.buttonText}
                            buttonLink={section?.buttonLinking}
                            buttonStyle={primaryButton}
                            textStyle={bodyColor}
                            headerStyle={headerColor}
                            textLeft='false'
                            columnReverse={section?.reverseColumn}
                            backgroundStyles={backgroundStyles}
                            // SECONDARY BUTTON
                            secondButtonText={section?.secondButtonLinking?.buttonText}
                            secondButtonLink={section?.secondButtonLinking}
                            secondaryButtonStyle={secondaryButton}
                        />
                    )
                }

                if (section._type === 'featuredGrid') {
                    return (
                        <FeaturedGrid
                            key={section._key}
                            heading={section?.heading}
                            content={section?.text}
                            blocks={section?.blockImages}
                            textOutsideImage={section?.textOutsideImage}
                            centerTextGrid={section?.centerTextGrid}
                            blockLeft={section?.blockLeft}
                            columnNumber={section?.columnNumber}
                            imageHeight={
                                section?.imageHeight === 'small' && '300px' ||
                                section?.imageHeight === 'medium' && '400px' ||
                                section?.imageHeight === 'large' && '500px'
                            }
                            removeGap={section?.removeGap}
                            removePadding={section?.removePadding}
                            twoColumn={section?.twoColumn}
                            textLeft={section?.textLeft}
                            fullWidth={section?.fullWidth}
                            buttonText={section?.buttonLinking?.buttonText}
                            buttonLink={section?.buttonLinking}
                            buttonStyle={primaryButton}
                            textStyle={bodyColor}
                            headerStyle={headerColor}
                            backgroundStyles={backgroundStyles}
                            // SECONDARY BUTTON
                            secondButtonText={section?.secondButtonLinking?.buttonText}
                            secondButtonLink={section?.secondButtonLinking}
                            secondaryButtonStyle={secondaryButton}

                        />
                    )
                }

                if (section._type === 'disclosureSection') {
                    return (
                        <DisclosureSection
                            key={section._key}
                            heading={section?.heading}
                            content={section?.content}
                            disclosure={section?.disclosures}
                            disclosureBackgroundColor={section?.disclosureBackgroundColor}
                            disclosureTextColor={section?.disclosureTextColor}
                            disclosureContentColor={section?.disclosureContentColor}
                            twoColumn={section?.twoColumn}
                            textLeft={section?.textLeft}
                            buttonText={section?.buttonLinking?.buttonText}
                            buttonLink={section?.buttonLinking}
                            buttonStyle={primaryButton}
                            textStyle={bodyColor}
                            headerStyle={headerColor}
                            backgroundStyles={backgroundStyles}
                            // SECONDARY BUTTON
                            secondButtonText={section?.secondButtonLinking?.buttonText}
                            secondButtonLink={section?.secondButtonLinking}
                            secondaryButtonStyle={secondaryButton}
                            />

                    )
                }

                if (section._type === 'gallery') {
                    return (
                        <Gallery
                            key={section._key}
                            heading={section?.heading}
                            content={section?.content}
                            images={section?.childImage}
                            altText={section?.childImage}
                            animation={section?.animation ?? 'fade'}
                            fullWidth={section?.fullWidth}
                            textColor={section?.textColor?.hex}
                            disableNavigation={section?.disableNavigation}
                            disablePagination={section?.disablePagination}
                            removePadding={section?.removePadding}
                            buttonText={section?.buttonLinking?.buttonText}
                            buttonLink={section?.buttonLinking}
                            buttonStyle={primaryButton}
                            textStyle={bodyColor}
                            headerStyle={headerColor}
                            backgroundStyles={backgroundStyles}
                            // SECONDARY BUTTON
                            secondButtonText={section?.secondButtonLinking?.buttonText}
                            secondButtonLink={section?.secondButtonLinking}
                            secondaryButtonStyle={secondaryButton}
                        />
                    )
                }

                if (section._type === 'testimonialBuilder') {
                    return (
                        <Testimonials
                            key={section._key}
                            heading={section?.heading}
                            testimonial={allTestimonial}
                            content={section?.content}
                            columnNumber={section?.columnNumber}
                            carousel={section?.carousel}
                            textLeft={section?.textLeft}
                            cardTextColor={section?.cardTextColor?.hex}
                            cardBackground={section?.cardBackground?.hex}
                            bodyColor={bodyColor}
                            arrowColor={section?.background?.textColor?.textColor?.hex}
                            buttonText={section?.buttonLinking?.buttonText}
                            buttonLink={section?.buttonLinking}
                            buttonStyle={primaryButton}
                            textStyle={bodyColor}
                            headerStyle={headerColor}
                            backgroundStyles={backgroundStyles}
                            // SECONDARY BUTTON
                            secondButtonText={section?.secondButtonLinking?.buttonText}
                            secondButtonLink={section?.secondButtonLinking}
                            secondaryButtonStyle={secondaryButton}
                            />
                    )
                }

                if (section._type === 'leadForm') {
                    return (
                        <LeadForm
                            key={section._key}
                            heading={section?.heading}
                            content={section?.content}
                            formBackground={secondaryBackground}
                            formTextColor={section?.formTextColor?.hex}
                            buttonText={section?.buttonLinking?.buttonText}
                            buttonLink={section?.buttonLinking}
                            buttonStyle={primaryButton}
                            textStyle={bodyColor}
                            headerStyle={headerColor}
                            backgroundStyles={backgroundStyles}
                            paddingSize={
                                section?.paddingSizing === 'large' ? 'md:py-32 py-20' : 'py-0'
                            }
                            // FORMS
                            emailAlerts={emailAlerts}
                            sendFrom={sendFrom}
                            emailBcc={emailBcc}
                            emailCc={emailCc}
                            // SECONDARY BUTTON
                            secondButtonText={section?.secondButtonLinking?.buttonText}
                            secondButtonLink={section?.secondButtonLinking}
                            secondaryButtonStyle={secondaryButton}
                            />
                    )
                }

                if (section._type === 'pricing') {
                    return (
                        <Pricing
                            key={section._key}
                            heading={section?.heading}
                            content={section?.content}
                            secondaryBackground={secondaryBackground}
                            blocks={section?.blockImages}
                            columnNumber={section?.columnNumber}
                            buttonText={section?.buttonLinking?.buttonText}
                            buttonLink={section?.buttonLinking}
                            buttonStyle={primaryButton}
                            textStyle={bodyColor}
                            headerStyle={headerColor}
                            backgroundStyles={backgroundStyles}
                            // SECONDARY BUTTON
                            secondButtonText={section?.secondButtonLinking?.buttonText}
                            secondButtonLink={section?.secondButtonLinking}
                            secondaryButtonStyle={secondaryButton}
                            />
                    )
                }

                if (section._type === 'teamDisplay') {
                    return (
                        <TeamSection
                            key={section._key}
                            heading={section?.heading}
                            content={section?.content}
                            team={allTeam}
                            carousel={section?.carousel}
                            buttonLink={section?.buttonLinking}
                            buttonText={section?.buttonLinking?.buttonText}
                            buttonStyle={primaryButton}
                            textStyle={bodyColor}
                            headerStyle={headerColor}
                            backgroundStyles={backgroundStyles}
                            // SECONDARY BUTTON
                            secondButtonText={section?.secondButtonLinking?.buttonText}
                            secondButtonLink={section?.secondButtonLinking}
                            secondaryButtonStyle={secondaryButton}
                            />
                    )
                }

                if (section._type === 'blogDisplay') {
                    return (
                        <BlogSection
                            key={section._key}
                            heading={section?.heading}
                            content={section?.content}
                            blog={allBlog}
                            carousel={section?.carousel}
                            buttonLink={section?.buttonLinking}
                            buttonText={section?.buttonLinking?.buttonText}
                            buttonStyle={primaryButton}
                            textStyle={bodyColor}
                            headerStyle={headerColor}
                            backgroundStyles={backgroundStyles}
                            // SECONDARY BUTTON
                            secondButtonText={section?.secondButtonLinking?.buttonText}
                            secondButtonLink={section?.secondButtonLinking}
                            secondaryButtonStyle={secondaryButton}
                            />
                    )
                }

                if (section._type === 'iconSection') {
                    return (
                        <IconSection
                            key={section._key}
                            heading={section?.heading}
                            content={section?.text}
                            blocks={section?.blockImages}
                            textLeft={section?.textLeft}
                            blockLeft={section?.blockLeft}
                            columnNumber={section?.columnNumber}
                            buttonText={section?.buttonLinking?.buttonText}
                            buttonLink={section?.buttonLinking}
                            buttonStyle={primaryButton}
                            textStyle={bodyColor}
                            headerStyle={headerColor}
                            backgroundStyles={backgroundStyles}
                            // SECONDARY BUTTON
                            secondButtonText={section?.secondButtonLinking?.buttonText}
                            secondButtonLink={section?.secondButtonLinking}
                            secondaryButtonStyle={secondaryButton}
                            />
                    )
                }

                if (section._type === 'codeBlock') {
                    return (
                        <div key={section._key}>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: `${section?.code}`
                                }}
                            />
                        </div>
                    )
                }

                if (section._type === 'contactPage') {
                    return (
                        <ContactPage
                            heading={section.heading}
                            content={section.text}
                            backgroundColor={section?.backgroundColor?.hex}
                            textColor={section?.textColor?.hex}
                            key={section._key}
                            email={email}
                            phone_number={phone_number}
                            address={address}
                            city={city}
                            state={state}
                            zip_code={zip_code}
                            // SOCIAL
                            facebook={facebook}
                            youtube={youtube}
                            instagram={instagram}
                            twitter={twitter}
                            reddit={reddit}
                            linkedin={linkedin}
                            yelp={yelp}
                            pinterest={pinterest}
                            tiktok={tiktok}
                            zillow={zillow}
                            size={size}
                            // FORMS
                            emailAlerts={emailAlerts}
                            sendFrom={sendFrom}
                            emailBcc={emailBcc}
                            emailCc={emailCc}
                            // HOURS
                            hours={section?.hours}
                            monday={monday}
                            tuesday={tuesday}
                            wednesday={wednesday}
                            thursday={thursday}
                            friday={friday}
                            saturday={saturday}
                            sunday={sunday}
                        />
                    )
                }

                if (section._type === 'servicesDisplay') {
                    return (
                        <ServiceSection
                            key={section._key}
                            heading={section?.heading}
                            content={section?.content}
                            services={allServices}
                            carousel={section?.carousel}
                            buttonLink={section?.buttonLinking}
                            buttonText={section?.buttonLinking?.buttonText}
                            buttonStyle={primaryButton}
                            textStyle={bodyColor}
                            headerStyle={headerColor}
                            backgroundStyles={backgroundStyles}
                            // SECONDARY BUTTON
                            secondButtonText={section?.secondButtonLinking?.buttonText}
                            secondButtonLink={section?.secondButtonLinking}
                            secondaryButtonStyle={secondaryButton}
                            />
                    )
                }

                if (section._type === 'logos') {
                    return (
                        <Logos
                            key={section._key}
                            heading={section?.heading}
                            content={section?.content}
                            images={section?.childImage}
                            altText={section?.childImage}
                            fullWidth={section?.fullWidth}
                            textColor={section?.textColor?.hex}
                            textStyle={bodyColor}
                            headerStyle={headerColor}
                            backgroundStyles={backgroundStyles}
                        />
                    )
                }

            })}
        </>
    )
}