import React from 'react'

import '../../../scss/common/InputTypes.scss'

export default function InputHandlers(props) {
	return (
		<ul className="InputHandlers">
			<li>
				<button>
					<i className="fa fa-comment"></i>
				</button>
			</li>

			<li>
				<button>
					<i className="fa fa-trash"></i>
				</button>
			</li>
		</ul>
	)
}
