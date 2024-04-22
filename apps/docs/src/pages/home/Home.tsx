import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import Heading from '@theme/Heading'

export default () => {
	const { siteConfig } = useDocusaurusContext()

	return (
		<Layout
			title="Home"
			description="Description will go into a meta tag in <head />"
		>
			<header>
				<div className="container">
					<Heading as="h1">{siteConfig.title}</Heading>
					<p>{siteConfig.tagline}</p>
					<div>
						<Link
							className="button button--secondary button--lg"
							to="/docs/overview/introduction"
						>
							Documentation
						</Link>
					</div>
				</div>
			</header>
		</Layout>
	)
}
