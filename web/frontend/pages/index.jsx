import {
  Card,
  Page,
  Layout,
  TextContainer,
  Image,
  Stack,
  Link,
  Text,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation, Trans } from "react-i18next";

import { trophyImage } from "../assets";

import { ProductsCard } from "../components";
import ApplicationForm from "../components/ApplicationForm";

export default function HomePage() {
  const { t } = useTranslation();
  return (
    <Page narrowWidth>
      <ApplicationForm />
    </Page>
  );
}
