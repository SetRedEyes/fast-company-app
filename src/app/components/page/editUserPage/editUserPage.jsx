import React, { useEffect, useState } from "react"
import api from "../../../api"
import { validator } from "../../../../utils/validator"
import TextField from "../../common/form/textField"
import SelectField from "../../common/form/selectField"
import RadioField from "../../common/form/radioField"
import MultiSelectField from "../../common/form/multiSelectField"
import { useHistory, useParams } from "react-router"
import { Link } from "react-router-dom"

const EditUserPage = () => {
    const history = useHistory()
    const { userId } = useParams()
    const [isLoading, setIsLoading] = useState()
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        profession: "",
        sex: "male",
        qualities: []
    })
    const [professions, setProfessions] = useState([])
    const [qualities, setQualities] = useState({})
    const [errors, setErrors] = useState({})

    const getProfessionById = (id) => {
        for (const prof in professions) {
            const profData = professions[prof]
            if (profData._id === id) return profData
        }
    }

    const getQualities = (elements) => {
        const qualitiesArray = []
        for (const elem in elements) {
            for (const q in qualities) {
                if (elem.value === qualities[q]._id) {
                    qualitiesArray.push(qualities[q])
                }
            }
        }
        return qualitiesArray
    }

    useEffect(() => {
        setIsLoading(true)
        api.users.getById(userId).then(({ profession, ...data }) => {
            setData((prevState) => ({
                ...prevState,
                ...data,
                profession: profession._id
            }))
        })
        api.professions.fetchAll().then((data) => setProfessions(data))
        api.qualities.fetchAll().then((data) => setQualities(data))
    }, [])

    useEffect(() => {
        if (data._id) setIsLoading(false)
    }, [data])

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: { message: "Электронная почта введена не корректно" }
        },
        name: {
            isRequired: { message: "Имя обязателено для заполнения" }
        }
    }

    const handleChange = (target) => {
        setData((prevState) => ({ ...prevState, [target.name]: target.value }))
    }

    useEffect(() => {
        validate()
    }, [data])

    const validate = () => {
        const errors = validator(data, validatorConfig)
        setErrors(errors)
        return Object.keys(errors).length === 0
    }

    const isValid = Object.keys(errors).length !== 0

    const handleSubmit = (e) => {
        e.preventDefault()
        const isValid = validate()
        if (!isValid) return
        const { profession, qualities } = data
        api.users
            .update(userId, {
                ...data,
                professions: getProfessionById(profession),
                qualities: getQualities(qualities)
            })
            .then((data) => history.push(`/users/${data._id}`))
        console.log(data)
    }

    return (
        <div className="container mt-3 ">
            <Link to={`/users/${userId}`} className="btn btn-primary">
                Назад
            </Link>
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {!isLoading && Object.keys(professions).length > 0 ? (
                        <form onSubmit={handleSubmit} className="ms-3">
                            <TextField
                                label="Имя"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextField
                                label="Электронная почта"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                error={errors.email}
                            />
                            <SelectField
                                label="Выберите свою профессию"
                                defaultOption="Выбрать..."
                                options={professions}
                                onChange={handleChange}
                                value={data.profession}
                                error={errors.profession}
                                name="profession"
                            />
                            <RadioField
                                options={[
                                    { name: "Male", value: "male" },
                                    { name: "Female", value: "female" },
                                    { name: "Other", value: "other" }
                                ]}
                                value={data.sex}
                                name="sex"
                                onChange={handleChange}
                                label="Выберите ваш пол"
                            />
                            <MultiSelectField
                                options={qualities}
                                onChange={handleChange}
                                name="qualities"
                                label="Выберите ваши качества"
                                defaultValue={data.qualities}
                                values
                            />
                            <button
                                type="submit"
                                disabled={isValid}
                                className="btn btn-primary w-100 mx-auto"
                            >
                                Изменить
                            </button>
                        </form>
                    ) : (
                        <h1 className="ms-3">Loading...</h1>
                    )}
                </div>
            </div>
        </div>
    )
}

export default EditUserPage
